import React from 'react';
import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        spinner: {
            position: 'absolute',
            top: '50vh',
            left: '50vw'
        }
    }),
);

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
