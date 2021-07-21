import React, { useEffect } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';

import Spinner from '../../Spinner';
import toastAlert from '../../toastAlert';
import ChatContainer from './chat';
import SideBar from './sideBar';
import { IUser } from '../../../interfaces/user';
import { IAlert } from '../../../interfaces/alert';

const useStyles = makeStyles((theme: Theme) => ({
    layout: {
        height: '90vh'
    },
    gridWrapper: {
        height: '100%',
        padding: theme.spacing(1)
    },
    borderRight: {
        borderRight: '1px solid lightgrey'
    }
}));

interface Props {
    isLoading: boolean,
    users: IUser[],
    alertInfo: IAlert
    getUsers: () => void
}

const Dashboard: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { isLoading, users, alertInfo, getUsers } = props;
    const alertType = alertInfo.alertType;
    const alertMessage = alertInfo.alertMessage || 'error !';

    useEffect(() => {
        alertType && !isLoading && toastAlert(alertType, alertMessage);
        getUsers();
    }, []);

    return (
        <main>
            {
                isLoading ?
                    <Spinner /> :
                    <Grid container className={ classes.layout }>
                        <Grid item xs={ 3 } className={ `${ classes.gridWrapper } ${ classes.borderRight }` }>
                            <SideBar users={ users } />
                        </Grid>
                        <Grid item xs={ 9 } className={ classes.gridWrapper } >
                            <ChatContainer />
                        </Grid>
                    </Grid>
            }
        </main>
    );
};

export default Dashboard;
