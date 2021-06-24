import React, { useEffect } from 'react';

import { IAlert, IUser } from '../../interfaces';
import Spinner from '../Spinner';
import UserCard from '../UserCard';
import toastAlert from '../toastAlert';

interface Props {
    isLoading: boolean,
    users: IUser[],
    alertInfo: IAlert
    getUsers: () => void
}

const Dashboard: React.FC<Props> = (props) => {
    const { isLoading, users, alertInfo, getUsers } = props;
    const alertType = alertInfo.alertType;
    const alertMessage = alertInfo.alertMessage || 'error !';

    useEffect(() => {
        alertType && !isLoading && toastAlert(alertType, alertMessage);
        getUsers();
    }, []);

    return (
        <>
            {
                isLoading ?
                    <Spinner /> :
                    users && users.map(user => <UserCard key={ user._id } user={ user } />)
            }
        </>
    );
};

export default Dashboard;
