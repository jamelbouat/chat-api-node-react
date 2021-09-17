import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import { IConversationUser } from '../../../interfaces/conversations';
import { useCurrentUserContext } from '../../../context/CurrentUserContext';
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
    const currentUserId = useCurrentUserContext()?._id;

    const groupedUserNames = () => {
        if (conversationUsers?.length === 1 && conversationUsers[0]?._id === currentUserId) {
            return ['Unknown user'];
        }
        return conversationUsers?.map((user) => {
            if (user._id === currentUserId) {
                return;
            }
            if (!user) {
                return 'Unknown user';
            }
            return conversationUsers.length <= 2 ? getFullName(user) : getFirstName(user);
        });
    };

    return(
        <div className={ classes.layout }>
            {
                groupedUserNames().filter(Boolean).join(', ')
            }
        </div>
    );
};

export default GroupedConversationUserNames;


