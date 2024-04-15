const themeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#f3f1ec',
            paper: '#fffaf5',
        },
        text: {
            primary: '#000000',
            secondary: '#424242',
        },
    },
    typography: {
        fontFamily: 'San Francisco, -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Arial, sans-serif',
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: 8,
                },
            },
        },
    },
};

export default themeOptions;