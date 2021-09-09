import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    height: '100vh',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                    position: 'relative'
                },
                '*::-webkit-scrollbar': {
                    width: '0.5em'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(1,1,1,.2)',
                    borderRadius: '10px'
                },
                '*::-webkit-scrollbar-track': {
                    backgroundColor: 'rgba(1,1,1,.1)',
                    borderRadius: '10px'
                }
            }
        },
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    }
});

export default theme;
