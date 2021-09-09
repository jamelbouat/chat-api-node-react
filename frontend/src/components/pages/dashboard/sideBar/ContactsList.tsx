import React, { FC } from 'react';
import { List, makeStyles } from '@material-ui/core';

import ContactItem from './ContactItem';
import { IUser } from '../../../../interfaces/user';

interface Props {
    users: IUser[],
}

const useStyles = makeStyles(() => ({
    layout: {
        overflow: 'auto',
        flex: '1 1 auto',
    }
}));

const ContactsList: FC<Props> = ({ users, ...rest }) => {
    const classes = useStyles();

    return (
        <div className={ classes.layout }>
            <List>
                {
                    users && users.map(user =>
                        <ContactItem key={ user._id } user={ user } status={ true } { ...rest } />
                    )}
            </List>
        </div>

    );
};

export default ContactsList;
