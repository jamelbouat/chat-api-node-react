import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    margin: 0,
                    padding: 0,
                    overflowX: 'hidden',
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
