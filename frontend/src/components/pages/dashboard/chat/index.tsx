import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core';

import ChatForm from './ChatForm';
import ChatConversation from './ChatConversation';

const useStyles= makeStyles(() => ({
    chatContainer: {
        position: 'relative',
        height: '100%',
    }
}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const ChatContainer: FunctionComponent<Props> = (props) => {
    const classes = useStyles();

    return (
        <div className={ classes.chatContainer }>
            <ChatConversation />
            <ChatForm />
        </div>
    );
};

export default ChatContainer;
