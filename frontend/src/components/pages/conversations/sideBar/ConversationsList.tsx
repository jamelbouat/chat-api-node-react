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
    getConversations: () => void;
    changeCurrentConversation: (_id: string) => void;
    alertInfo: IAlert
}

const ConversationsList: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { isLoading, conversations, getConversations, changeCurrentConversation, alertInfo } = props;
    const alertType = alertInfo.alertType;
    const alertMessage = alertInfo.alertMessage || 'error !';

    useEffect(() => {
        alertType && !isLoading && toastAlert(alertType, alertMessage);
        getConversations();
    }, []);

    const handleChangeCurrentConversation = (_id: string) => {
        changeCurrentConversation(_id);
    };

    return (
        <List className={ classes.layout }>
            {
                isLoading ? <Spinner /> :
                    conversations.map(conversation => (
                        <ConversationItem
                            key={ conversation._id }
                            conversation={ conversation }
                            changeCurrentConversation={ (_id) => handleChangeCurrentConversation(_id) }
                        />
                    ))
            }
        </List>
    );
};

export default ConversationsList;
