import React, { FC } from 'react';
import { List } from '@material-ui/core';

import ContactItem from './ContactItem';
import { IUser } from '../../../../interfaces/user';

interface Props {
    users: IUser[],
    handleAlignment: (alignment: string) => void
}

const ContactsList: FC<Props> = ({ users, ...rest }) => {

    return (
        <div>
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
