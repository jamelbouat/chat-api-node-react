import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import ContactsList from './ContactsList';
import { IUser } from '../../../../interfaces/user';

const useStyles = makeStyles(() => ({
    layout: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%'
    }
}));

interface Props {
    users: IUser[],
}

const SideBar: React.FC<Props> = ({ users }) => {
    const classes = useStyles();

    return (
        <div className={ classes.layout }>
            <Typography variant='h5' align='center'>Contacts</Typography>
            <ContactsList users={ users }/>
        </div>
    );
};

export default SideBar;
