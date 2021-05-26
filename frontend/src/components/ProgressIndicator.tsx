import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(() => ({
    progress: {
        width: '100%',
        padding: 3,
        position: 'absolute'
    },
}));

const ProgressIndicator: React.FC = () => {
    const classes = useStyles();

    return(
        <div>
            <LinearProgress className={ classes.progress }/>
        </div>

    );
};

export default ProgressIndicator;
