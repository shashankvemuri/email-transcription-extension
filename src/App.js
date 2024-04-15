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
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Email Transcription Extension
                </Typography>
                <Typography variant="subtitle1" textAlign="center">
                    Transcribe spoken words into text directly in your Gmail tab!
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
                <Divider style={{ width: '90%', marginTop: '5px' }}/>
                <Typography variant="body2" textAlign="center">
                    How to Use:
                </Typography>
                <Typography variant="body2" style={{ width: '90%', marginTop: '-10px' }}>
                    <ol>
                        <li>After saving your API Key, open (or refresh) Gmail and click Compose to start a new email draft.</li>
                        <li>In the bottom toolbar, next to the send button, use the <img src="icons/start_icon.png" alt="Start Recording" style={{ width: '16px', verticalAlign: 'middle' }} /> to start and <img src="icons/stop_icon.png" alt="Stop Recording" style={{ width: '16px', verticalAlign: 'middle' }} /> to stop voice transcription of your email.</li>
                    </ol>
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