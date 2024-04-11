// Import necessary React and Material-UI components
import React, { useState } from 'react';
import { CssBaseline, Box, TextField, Typography, Button, ThemeProvider } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import themeOptions from './themeOptions';

// Create a custom theme using theme options
const darkTheme = createTheme(themeOptions);

// Main App component
function App() {
    // State hook for managing OpenAI API token
    const [token, setToken] = useState('');

    // Effect hook to retrieve the stored token from Chrome storage when the component mounts
    React.useEffect(() => {
        window.chrome.storage.sync.get(['openai_token'], function(result) {
            if (result.openai_token) {
                setToken(result.openai_token);
            }
        });
    }, []);

    // Handler for token input changes
    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    // Handler for saving the token to Chrome storage
    const handleTokenSave = () => {
        window.chrome.storage.sync.set({ openai_token: token }, () => {
            console.log('Token saved:', token);
        });
    };

    // Component rendering
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box display="flex" flexDirection="column" width="350px" padding="20px" gap="16px" alignItems="center" bgcolor="background.paper" borderRadius={2}>
                {/* Application title */}
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Email Transcription Extension
                </Typography>
                {/* Brief description of the application's functionality */}
                <Typography variant="subtitle1" textAlign="center">
                    Transcribe spoken words into text directly in your Gmail client!
                </Typography>
                {/* Text field for the user to input their OpenAI API token */}
                <TextField
                    fullWidth
                    label="OpenAI API Token"
                    value={token}
                    onChange={handleTokenChange}
                    placeholder="sk-..."
                    size="small"
                    type={token.length > 0 ? 'password' : 'text'}
                />
                {/* Button to save the entered token */}
                <Button variant="contained" color="primary" onClick={handleTokenSave}>
                    Save Token
                </Button>
                {/* Instructions for obtaining an OpenAI API key */}
                <Typography variant="body2" textAlign="center">
                    Enter your OpenAI API key to enable the email transcription service. <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">Get your key</a>.
                </Typography>
            </Box>
        </ThemeProvider>
    );
}

export default App;