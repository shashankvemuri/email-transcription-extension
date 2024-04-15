// Import necessary React and Material-UI components
import React, { useState } from 'react';
import { CssBaseline, Box, TextField, Typography, Button, ThemeProvider, Snackbar, Alert, Divider } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import themeOptions from './themeOptions';

// Create a custom theme using theme options
const darkTheme = createTheme(themeOptions);

// Main App component
function App() {
    const [token, setToken] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    // Handler for token input changes
    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    // Handler for saving the token to Chrome storage
    const handleTokenSave = () => {
        if (!token.trim()) {
            setSnackbarMessage('Please enter an API key!');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return;
        }

        // Optionally test the token by making a test API call
        testAPIKey(token, (isValid) => {
            if (isValid) {
                window.chrome.storage.sync.set({ openai_token: token }, () => {
                    setSnackbarMessage('API Token saved successfully!');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                });
            } else {
                setSnackbarMessage('Invalid API Key. Please check and try again.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        });
    };

    // Simulate an API key validation
    const testAPIKey = (apiKey, callback) => {
        fetch('https://api.openai.com/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        }).then(response => {
            callback(response.ok);
        }).catch(() => {
            callback(false);
        });
    };

    // Component for displaying feedback as a Snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
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
                <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
}

export default App;