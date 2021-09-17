import React, { MutableRefObject } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import { IReceivedMessage } from '../../../../interfaces/conversations';

const useStyles = makeStyles((theme: Theme) => ({
    sentMessageBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: '.6em'
    },
    sentMessageText: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '.8em',
        padding: '7px 7px',
        maxWidth: '600px',
        color: 'white',
        overflowWrap: 'break-word',
        marginRight: theme.spacing(1)
    }
}));

interface Props {
    message: IReceivedMessage;
    lastMessageRef: MutableRefObject<HTMLSpanElement> | null
}

const SentMessageBox: React.FC<Props> = ({ message, lastMessageRef }) => {
    const classes = useStyles();

    return(
        <div className={ classes.sentMessageBox }>
            <div className={ classes.sentMessageText }>
                <span ref={ lastMessageRef }>{ message.content }</span>
            </div>
        </div>
    );
};

export default SentMessageBox;
