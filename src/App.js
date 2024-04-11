import React, { useState } from 'react';
import { CssBaseline, Box, TextField, Typography, Button, ThemeProvider } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import themeOptions from './themeOptions';

const darkTheme = createTheme(themeOptions);

function App() {
    const [token, setToken] = useState('');

    // Fetch the stored token when the component mounts
    React.useEffect(() => {
        window.chrome.storage.sync.get(['openai_token'], function(result) {
            if (result.openai_token) {
                setToken(result.openai_token);
            }
        });
    }, []);

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    // Updated handleTokenSave function
    const handleTokenSave = () => {
        window.chrome.storage.sync.set({ openai_token: token }, () => {
            console.log('Token saved:', token);
            // Optional: Show a success message to the user
            alert('Token saved successfully!');
        });
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box display="flex" flexDirection="column" width="350px" padding="20px" gap="16px" alignItems="center" bgcolor="background.paper" borderRadius={2}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Email Transcription Extension
                </Typography>
                <Typography variant="subtitle1" textAlign="center">
                    Transcribe spoken words into text directly in your Gmail client!
                </Typography>
                <TextField
                    fullWidth
                    label="OpenAI API Token"
                    value={token}
                    onChange={handleTokenChange}
                    placeholder="sk-..."
                    size="small"
                    type={token.length > 0 ? 'password' : 'text'}
                />
                <Button variant="contained" color="primary" onClick={handleTokenSave}>
                    Save Token
                </Button>
                <Typography variant="body2" textAlign="center">
                    Enter your OpenAI API key to enable the email transcription service. <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">Get your key</a>.
                </Typography>
            </Box>
        </ThemeProvider>
    );
}

export default App;