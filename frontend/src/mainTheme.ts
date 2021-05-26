import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    margin: 0,
                    padding: 0,
                    overflowX: 'hidden',
                    position: 'relative'
                },
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
