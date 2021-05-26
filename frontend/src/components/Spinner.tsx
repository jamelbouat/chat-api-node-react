import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Spinner: React.FC<any> = (props) => {
    return(
        <CircularProgress
            size={ 40 }
            thickness={ 4 }
            { ...props }
        />
    );
};

export default Spinner;
