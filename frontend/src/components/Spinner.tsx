import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    spinner: {
        margin: 'auto',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
}));

const Spinner: React.FC = () => {
    const classes = useStyles();

    return(
        <CircularProgress
            size={ 40 }
            thickness={ 4 }
            className={ classes.spinner }
        />
    );
};

export default Spinner;
