import React, { MutableRefObject, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';

import { IConversation, IConversationUser } from '../../../../interfaces/conversations';
import { useCurrentUserContext } from '../../../../context/CurrentUserContext';
import SentMessageBox from './SentMessageBox';
import ReceivedMessageBox from './ReceivedMessageBox';

const useStyles = makeStyles(() => ({
    layout: {
        overflowY: 'auto',
        flex: '1 1 auto'
    }
}));

interface Props {
    currentConversation: IConversation;
}

const ChatConversation: React.FC<Props> = ({ currentConversation }) => {
    const classes = useStyles();
    const currentUser = useCurrentUserContext();
    const lastMessageRef = useRef() as MutableRefObject<HTMLSpanElement>;
    const messageFromRef = useRef('');
    const messages = currentConversation.messages;

    useEffect(() => {
        lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        return () => {
            messageFromRef.current = '';
        };
    },[messages]);

    const handleLastMessageReference = (index: number) => {
        return messages.length === index + 1 ? lastMessageRef : null;
    };

    return (
        <div className={ classes.layout }>
            {
                messages?.map((message, index) => {
                    const showAvatar = messageFromRef.current !== message.from;
                    messageFromRef.current = message.from;

                    return (
                        message.from === currentUser?._id ?
                            <SentMessageBox
                                key={ message._id }
                                lastMessageRef={ handleLastMessageReference(index) }
                                message={ message }
                            /> :
                            <ReceivedMessageBox
                                key={ message._id }
                                lastMessageRef={ handleLastMessageReference(index) }
                                message={ message }
                                showAvatar={ showAvatar }
                                conversationUser={ getConversationUser(currentConversation, message.from) }
                            />
                    );
                })
            }
        </div>
    );
};

const getConversationUser = (currentConversation: IConversation, _id: string): IConversationUser => {
    return currentConversation.users.find((user: IConversationUser) => user._id === _id) as IConversationUser;
};

export default ChatConversation;
