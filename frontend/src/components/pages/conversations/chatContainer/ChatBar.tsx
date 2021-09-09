import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import AvatarGroupWithBadges from '../AvatarGroupWithBadges';
import GroupedConversationUserNames from '../GroupedConversationUserNames';
import { IConversationUser } from '../../../../interfaces/conversations';

const useStyles= makeStyles((theme: Theme) => ({
    layout: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(.8),
        marginBottom: theme.spacing(1),
        boxShadow: '0 .3px 1px',
        borderRadius: '1px',
    }
}));

interface Props {
    conversationUsers: IConversationUser[]
}

const ChatBar: React.FC<Props> = ({ conversationUsers }) => {
    const classes = useStyles();

    return (
        <div className={ classes.layout }>
            <AvatarGroupWithBadges conversationUsers={ conversationUsers } />
            <GroupedConversationUserNames conversationUsers={ conversationUsers }/>
        </div>
    );
};

export default ChatBar;
