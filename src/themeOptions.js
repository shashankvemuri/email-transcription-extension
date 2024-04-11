const themeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#E0E0E0',
            secondary: '#B0BEC5',
        },
    },
    typography: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                },
            },
        },
    },
};

export default themeOptions;