import React, { useEffect } from 'react';
import { List, makeStyles } from '@material-ui/core';

import { IConversation } from '../../../../interfaces/conversations';
import ConversationItem from './ConversationItem';
import { IAlert } from '../../../../interfaces/alert';
import toastAlert from '../../../toastAlert';
import Spinner from '../../../Spinner';

const useStyles = makeStyles(() => ({
    layout: {
        overflow: 'auto',
        flex: '1 1 auto',
    }
}));

interface Props {
    isLoading: boolean;
    conversations: IConversation[];
    alertInfo: IAlert;
    getConversations: () => void;
    changeCurrentConversation: (_id: string) => void;
    removeConversation: (_id: string) => void;
    clearConversationsAlertInfo: () => void;
}

const ConversationsList: React.FC<Props> = (props) => {
    const classes = useStyles();
    const {
        isLoading, conversations, alertInfo, getConversations,
        changeCurrentConversation, removeConversation, clearConversationsAlertInfo
    } = props;
    const alertType = alertInfo.alertType;
    const alertMessage = alertInfo.alertMessage || 'error !';

    useEffect(() => {
        getConversations();
    }, []);

    useEffect(() => {
        alertType && !isLoading && toastAlert(alertType, alertMessage);
        return () => {
            clearConversationsAlertInfo();
        };
    }, [conversations]);

    const handleChangeCurrentConversation = (_id: string) => changeCurrentConversation(_id);
    const handleRemoveConversation = (_id: string) => removeConversation(_id);

    return (
        <List className={ classes.layout }>
            {
                isLoading ? <Spinner /> :
                    conversations?.map(conversation => (
                        <ConversationItem
                            key={ conversation._id }
                            conversation={ conversation }
                            removeConversation={ () => handleRemoveConversation(conversation._id) }
                            changeCurrentConversation={ () => handleChangeCurrentConversation(conversation._id) }
                        />
                    ))
            }
        </List>
    );
};

export default ConversationsList;
