import React, { FunctionComponent } from 'react';
import { makeStyles, Theme, Avatar, Typography, Box } from '@material-ui/core';
import AvatarWithBadge from '../../../AvatarWithBadge';

const useStyles = makeStyles((theme: Theme) => ({
    chatConversation: {
        height: '75%',
        overflow: 'auto'
    },
    chatBar: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(.8),
        marginBottom: theme.spacing(1),
        boxShadow: '0 .3px 1px',
        borderRadius: '1px'
    },
    text: {
        marginLeft: theme.spacing(2)
    },
    receivedMessageBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    sentMessageBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    receivedMessageText: {
        backgroundColor: 'rgba(188,188,188, 1)',
        borderRadius: '1.3em',
        padding: '8px 15px',
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1),
        maxWidth: '600px'
    },
    sentMessageText: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '1.3em',
        padding: '8px 15px',
        maxWidth: '600px',
        color: 'white',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const ChatConversation: FunctionComponent<Props> = (props) => {
    const classes = useStyles();

    return (
        <>
            <div className={ classes.chatBar } >
                <Avatar />
                <Typography variant='h6' classes={ { root: classes.text } }>User</Typography>
            </div>

            <div className={ classes.chatConversation }>

                <Box className={ classes.receivedMessageBox }>
                    <AvatarWithBadge status={ false } />
                    <div className={ classes.receivedMessageText }>
                        <span>received message</span>
                    </div>
                </Box>
                <Box className={ classes.sentMessageBox }>
                    <div className={ classes.sentMessageText }>
                        <span>sent message</span>
                    </div>
                </Box>
                <div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div>
                <div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div>
                <div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div>
                <div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div>
                <div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div>
                <div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div>
                <div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div>
                <div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div><div>!!!</div>
            </div>
        </>

    );
};

export default ChatConversation;
