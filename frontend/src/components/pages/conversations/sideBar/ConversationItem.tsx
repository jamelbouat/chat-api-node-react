import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListItem, makeStyles } from '@material-ui/core';

import { IConversation } from '../../../../interfaces/conversations';
import GroupedConversationUserNames from '../GroupedConversationUserNames';
import AvatarGroupWithBadges from '../AvatarGroupWithBadges';
import ConfirmModal from '../../../ConfirmModal';
import DeleteIcon from '../../../DeleteIcon';

const useStyles = makeStyles(() => ({
    layout: {
        position: 'relative',
        '&:hover': {
            backgroundColor: 'rgba(240,242,245,1)',
            borderRadius: '3px'
        }
    },
    activeConversation: {
        backgroundColor: 'rgba(233,243,255,1)'
    },
    deleteIcon: {
        position: 'absolute',
        fontSize: '27px',
        right: 5,
        cursor: 'pointer',
        '&:hover': {
            fontSize: '28px',
            color: 'rgba(63,81,180,1)'
        }
    }
}));

interface Props {
    conversation: IConversation,
    changeCurrentConversation: () => void
    removeConversation: () => void
}

interface ParamsTypes {
    id: string
}

const ConversationItem: FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const { conversation, changeCurrentConversation, removeConversation } = props;
    const [ showDeleteIcon, setShowDeleteIcon ] = useState<boolean>(false);
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    const { id } = useParams<ParamsTypes>();
    const activeConversation = conversation._id === id;

    const handleChangeCurrentConversation = () => changeCurrentConversation();
    const handleOnMouseOver = () => !modalOpen && setShowDeleteIcon(true);
    const handleOnMouseLeave = () => setShowDeleteIcon(false);
    const handleDeleteIconClick = () => {
        setShowDeleteIcon(false);
        setModalOpen(true);
    };
    const handleCancelModalClick = () => setModalOpen(false);
    const handleConfirmModalClick = () => {
        removeConversation();
        setModalOpen(false);
    };

    return (
        <ListItem
            className={
                `${ classes.layout } 
                 ${ activeConversation ? classes.activeConversation : '' }`
            }
            onMouseOver={ handleOnMouseOver }
            onMouseLeave={ handleOnMouseLeave }
            onClick={ handleChangeCurrentConversation }
        >
            <AvatarGroupWithBadges conversationUsers={ conversation.users } />
            <GroupedConversationUserNames conversationUsers={ conversation.users }/>
            {
                showDeleteIcon &&
                <DeleteIcon title='Remove conversation' onDeleteIconClick={ handleDeleteIconClick }/>
            }
            <ConfirmModal
                open={ modalOpen }
                title='Remove conversation'
                content='This action is irreversible'
                onConfirmModalClick={ handleConfirmModalClick }
                onCancelModalClick={ handleCancelModalClick }
            />
        </ListItem>
    );
};

export default ConversationItem;
