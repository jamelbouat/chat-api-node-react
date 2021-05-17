import React from 'react';
import Alert, { Color } from '@material-ui/lab/Alert';

interface Props {
    message: string,
    severity: Color
}

const AlertInfo: React.FC<Props> = ({ message, severity }) => {
    return (
        <Alert severity={ severity }>{ message }</Alert>
    );
};

export default AlertInfo;
