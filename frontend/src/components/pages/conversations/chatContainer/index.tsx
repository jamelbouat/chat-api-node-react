import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';

import ChatBar from './ChatBar';
import { IConversation } from '../../../../interfaces/conversations';
import ChatForm from '../../../../containers/ChatForm';
import ChatConversation from '../../../../containers/ChatConversation';

const useStyles= makeStyles(() => ({
    layout: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%'
    }
}));

export interface ParamsProps {
    id: string
}

interface Props extends RouteComponentProps<ParamsProps> {
    isLoading: boolean;
    currentConversation: IConversation | undefined;
    setDefaultConversationPath: (_id: string) => void;
    joinConversationRoom: (currentConversation: IConversation) => void;
    socketId: string
}

const ChatContainer: React.FC<Props> = (props) => {
    const classes = useStyles();
    const {
        isLoading,
        currentConversation,
        setDefaultConversationPath,
        joinConversationRoom,
        socketId,
        match
    } = props;
    const conversationId = match.params.id && match.params.id;

    useEffect(() => {
        conversationId === '0' && currentConversation && setDefaultConversationPath(currentConversation._id);
        currentConversation && joinConversationRoom(currentConversation);
    }, [currentConversation, socketId]);

    return (
        <div className={ classes.layout }>
            {
                !isLoading ?
                    !currentConversation ? 'There is no conversation':
                        <>
                            <ChatBar conversationUsers={ currentConversation.users }/>
                            <ChatConversation currentConversation={ currentConversation }/>
                            <ChatForm currentConversation={ currentConversation }/>
                        </>
                    : null
            }
        </div>
    );
};

export default ChatContainer;
