import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    layout: {
        height: '100%',
        overflow: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative'
    },
    paper: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    field: {
        height: theme.spacing(4),
        marginBottom: theme.spacing(6),
    },
    button: {
        marginBottom: theme.spacing(2),
        '&$disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto'
        }
    },
    disabled: {},
    links: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}));

export default useStyles;
