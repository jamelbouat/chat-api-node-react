import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    layout: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        maxWidth: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative'
    },
    paper: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    field: {
        height: theme.spacing(5),
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
