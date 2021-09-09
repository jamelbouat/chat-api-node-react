import React, { FunctionComponent, MutableRefObject, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';

import { IConversation, IConversationUser, IMessage } from '../../../../interfaces/conversations';
import { useCurrentUser } from '../../../../context/CurrentUserProvider';
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
    // getConversationMessages: (_id: string) => void;
    // messages: IMessage[];
}

const ChatConversation: FunctionComponent<Props> = ({ currentConversation }) => {
    const classes = useStyles();
    const currentUser = useCurrentUser();
    const lastMessageRef = useRef() as MutableRefObject<HTMLSpanElement>;
    const messageFromRef = useRef('');
    const messages = currentConversation.messages;

    // useEffect(() => {
    //     getConversationMessages(currentConversation._id);
    // }, []);

    useEffect(() => {
        lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={ classes.layout }>
            {
                messages?.map((message, index) => {
                    const showAvatar = messageFromRef.current !== message.from;
                    messageFromRef.current = message.from;

                    return message.from === currentUser?._id ?
                        <SentMessageBox
                            key={ message._id }
                            lastMessageRef={ messages.length === index + 1 ? lastMessageRef : null }
                            message={ message }
                        /> :
                        <ReceivedMessageBox
                            key={ message._id }
                            lastMessageRef={ messages.length === index + 1 ? lastMessageRef : null }
                            message={ message }
                            showAvatar={ showAvatar }
                            conversationUser={ getConversationUser(currentConversation, message.from) }
                        />;
                })
            }
        </div>
    );
};

const getConversationUser = (currentConversation: IConversation, _id: string): IConversationUser => {
    return currentConversation.users.find((user: IConversationUser) => user._id === _id) as IConversationUser;
};

export default ChatConversation;
