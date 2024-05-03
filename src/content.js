import * as InboxSDK from '@inboxsdk/core';

// Utility function to retrieve data from Chrome storage
async function retrieveFromStorage(key) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(key, function (result) {
            resolve(result[key]);
        });
    });
}

// AudioRecorder class to handle audio recording and transcription
class AudioRecorder {
    constructor(sdk) {
        this.sdk = sdk;
        this.recording = false;
        this.mediaRecorder = null;
        this.stream = null;
        this.token = null;
        this.chunks = [];
        this.originalContent = "";
    }

    // Retrieves the OpenAI API token from storage
    async retrieveToken() {
        return await retrieveFromStorage('openai_token');
    }

    // Starts recording audio from the user's microphone
    async startRecording(composeView) {
        // Checks if recording is already in progress
        if (this.recording) {
            this.sdk.ButterBar.showMessage({ text: 'Recording is already in progress.' });
            return;
        }

        // Stores the compose view and its original content
        this.composeView = composeView;
        this.originalContent = composeView.getBodyElement().innerHTML;

        // Updates the compose view to show the recording indicator
        this.composeView.getBodyElement().innerHTML = '<div>Recording<span class="ellipsis-animation">...</span></div>';

        // Attempts to access the user's microphone and start recording
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(this.stream);
            this.mediaRecorder.ondataavailable = (event) => this.chunks.push(event.data);
            this.mediaRecorder.onstop = this.handleRecordingStop.bind(this);
            this.mediaRecorder.start();
            this.recording = true;
        } catch (error) {
            console.error('Error starting recording:', error);
            this.sdk.ButterBar.showMessage({ text: 'Error starting recording: ' + error.message });
        }
    }

    // Handles the stop event of the media recorder
    async handleRecordingStop() {
        // Shows the transcribing indicator
        this.composeView.getBodyElement().innerHTML = '<div class="transcribing-indicator"><img src="' + chrome.runtime.getURL("icons/status.gif") + '"> Transcribing...</div>';

        // Creates a Blob from the recorded audio chunks
        const audioBlob = new Blob(this.chunks, { type: 'audio/webm' });
        const storedToken = await this.retrieveToken();
        this.chunks = [];

        // Processes the recorded audio for transcription and optimization
        try {
            const transcriptionText = await processTranscription(audioBlob, storedToken);
            const optimizedText = await postToGPT4(transcriptionText, storedToken);
            // Restores the original content and appends the transcribed text
            this.composeView.getBodyElement().innerHTML = this.originalContent;
            this.insertTextResult(optimizedText);
        } catch (error) {
            console.error('Error in processing:', error);
            this.sdk.ButterBar.showMessage({ text: 'Error in processing: ' + error.message });
        }

        // Stops all media tracks to release the microphone
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
    }

    // Stops the recording if it's in progress
    stopRecording() {
        if (this.mediaRecorder && this.recording) {
            this.mediaRecorder.stop();
            this.recording = false;
        } else {
            this.sdk.ButterBar.showMessage({ text: 'No recording to stop.' });
        }
    }

    // Inserts the transcribed and optimized text into the email body
    insertTextResult(resultText) {
        this.composeView.insertTextIntoBodyAtCursor(resultText);
    }
}

// Global variable to store the AudioRecorder instance
let recorderInstance = null;

// Loads the InboxSDK and sets up the compose view with transcription buttons
InboxSDK.load(2, "sdk_Transcription_7792b396c1").then((sdk) => {
    sdk.Compose.registerComposeViewHandler((composeView) => {
        // Ensures a single instance of AudioRecorder is used across the extension
        if (!recorderInstance) {
            recorderInstance = new AudioRecorder(sdk);
        }

        // Adds a button to start the transcription process
        composeView.addButton({
            title: "Start Email Transcription",
            iconUrl: chrome.runtime.getURL("icons/start_icon.png"),
            onClick: () => {
                if (!recorderInstance.recording) {
                    recorderInstance.startRecording(composeView);
                }
            },
            hasDropdown: false,
            type: 'MODIFIER',
        });

        // Adds a button to stop the transcription process
        composeView.addButton({
            title: "Stop Email Transcription",
            iconUrl: chrome.runtime.getURL("icons/stop_icon.png"),
            onClick: () => {
                recorderInstance.stopRecording();
            },
            hasDropdown: false,
            type: 'MODIFIER',
        });
    });
});
  

// Function to transcribe audio to text using OpenAI's Whisper model
async function processTranscription(audioBlob, storedToken) {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');
    formData.append('model', 'whisper-1');

    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${storedToken}` },
        body: formData,
    };

    try {
        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', requestOptions);
        if (response.status === 200) {
            const result = await response.json();
            return result.text;
        } else {
            console.error('Transcription API error:', response);
            return `Error: ${response.status}`;
        }
    } catch (error) {
        console.error('Error fetching transcription:', error);
        return 'Error: Could not process transcription';
    }
}

// Function to post-process the transcription using OpenAI's GPT-4 for corrections and formatting
async function postToGPT4(transcriptionText, storedToken) {
    const gptRequestBody = {
        model: "gpt-4",
        messages: [{
            role: "user",
            content: `As an editor, your task is to proofread the provided email transcript. Focus on ensuring the accurate spelling of proper nouns, including names of individuals, organizations, products, and geographical locations. Separate the email into distinct paragraphs based on topics, including a greeting, body, and sign-off only if present. Do not introduce any new content, change the transcription beyond spelling fixes, or add a subject line. Keep formatting simple and in line with the original structure. If you detect list formatting in the content, format it appropriately as numbered or bulleted lists. Return the corrected version without adding a period at the end or using a prefix like 'Transcript:'.
    
            Transcript: ###
            ${transcriptionText}
            ###
        `}],
        temperature: 0.2
    };      

    const gptHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedToken}`
    });

    const gptRequestOptions = {
        method: 'POST',
        headers: gptHeaders,
        body: JSON.stringify(gptRequestBody),
    };

    try {
        const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', gptRequestOptions);
        const gptResult = await gptResponse.json();
        return gptResult.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error processing transcription through GPT-4:', error);
        return transcriptionText;
    }
}