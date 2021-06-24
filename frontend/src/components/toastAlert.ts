import React from 'react';
import { toast } from 'react-toastify';

import { ALERT_TYPE } from '../constants';

const toastAlert = (appearance: ALERT_TYPE, content: string): React.ReactText => {

    return(
        toast(content, {
            type: appearance,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: true,
        })
    );
};

export default toastAlert;
