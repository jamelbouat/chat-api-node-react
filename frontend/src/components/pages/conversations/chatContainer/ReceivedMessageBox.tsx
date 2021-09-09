import React, { MutableRefObject } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import AvatarGroupWithBadges from '../AvatarGroupWithBadges';
import { IConversationUser, IMessage } from '../../../../interfaces/conversations';

const useStyles = makeStyles((theme: Theme) => ({
    text: {
        marginLeft: theme.spacing(2)
    },
    receivedMessageBox: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '.6em'
    },
    receivedMessageText: {
        backgroundColor: 'rgba(226,228,230,1)',
        borderRadius: '.8em',
        padding: '7px 7px',
        maxWidth: '600px',
        overflowWrap: 'break-word',
        marginLeft: theme.spacing(1)
    },
    emptyElement: {
        width: 40
    }
}));

interface Props {
    message: IMessage;
    conversationUser: IConversationUser;
    showAvatar: boolean;
    lastMessageRef: MutableRefObject<HTMLSpanElement> | null
}

const ReceivedMessageBox: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { message, conversationUser, showAvatar, lastMessageRef } = props;

    return(
        <div className={ classes.receivedMessageBox }>
            {
                showAvatar ?
                    <AvatarGroupWithBadges conversationUsers={ [ conversationUser ] }/> :
                    <div className={ classes.emptyElement }/>
            }
            <div className={ classes.receivedMessageText }>
                <span ref={ lastMessageRef }>{ message.content }</span>
            </div>
        </div>
    );
};

export default ReceivedMessageBox;
