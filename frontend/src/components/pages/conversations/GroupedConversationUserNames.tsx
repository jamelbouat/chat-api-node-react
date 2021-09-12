import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import { IConversationUser } from '../../../interfaces/conversations';
import { useCurrentUser } from '../../../context/CurrentUserProvider';
import { getFirstName, getFullName } from '../../../utils/user';

const useStyles = makeStyles((theme: Theme) => ({
    layout: {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        marginLeft: theme.spacing(1)
    }
}));

interface Props {
    conversationUsers: IConversationUser[]
}

const GroupedConversationUserNames: React.FC<Props> = ({ conversationUsers }) => {
    const classes = useStyles();
    const currentUser = useCurrentUser();

    const groupedUserNames = conversationUsers && conversationUsers.map((user) => {
        if (!user || user._id === currentUser?._id) {
            return;
        }
        return conversationUsers.length <= 2 ? getFullName(user) : getFirstName(user);
    });

    return(
        <div className={ classes.layout }>
            {
                groupedUserNames?.filter(Boolean).join(', ')
            }
        </div>
    );
};

export default GroupedConversationUserNames;


