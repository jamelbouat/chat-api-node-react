import React, { useCallback, useEffect } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';

import ContactsContainer from './contactsContainer';
import SideBar from './sideBar';
import { IUser } from '../../../interfaces/user';
import { IAlert } from '../../../interfaces/alert';
import toastAlert from '../../toastAlert';

const useStyles = makeStyles((theme: Theme) => ({
    layout: {
        height: '100%',
    },
    gridWrapper: {
        position: 'relative',
        height: '100%',
        padding: theme.spacing(1)
    },
    borderRight: {
        borderRight: '1px solid lightgrey'
    }
}));

interface Props {
    isLoading: boolean;
    users: IUser[];
    alertInfo: IAlert;
    getUsers: () => void;
    connectToSocketService: () => void
}

const Dashboard: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { isLoading, users, alertInfo, getUsers, connectToSocketService } = props;
    const alertType = alertInfo.alertType;
    const alertMessage = alertInfo.alertMessage || 'error !';

    useEffect(() => {
        alertType && !isLoading && toastAlert(alertType, alertMessage);
        getUsers();
    }, []);

    useEffect(() => {
        connectToSocketService();
    },[]);

    return (
        <Grid container className={ classes.layout }>
            <Grid item xs={ 3 } className={ `${ classes.gridWrapper } ${ classes.borderRight }` }>
                <SideBar users={ users }/>
            </Grid>
            <Grid item xs={ 9 } className={ classes.gridWrapper } >
                <ContactsContainer users={ users } />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
