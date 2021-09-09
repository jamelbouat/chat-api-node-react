import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListItem, makeStyles, Tooltip } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import AvatarGroupWithBadges from '../AvatarGroupWithBadges';
import { IConversation } from '../../../../interfaces/conversations';
import GroupedConversationUserNames from '../GroupedConversationUserNames';

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
    changeCurrentConversation: (_id: string) => void
    status?: boolean
}

interface ParamTypes {
    id: string
}

const ConversationItem: FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const { conversation, changeCurrentConversation } = props;
    const [showIcon, setShowIcon] = useState(false);
    const { id } = useParams<ParamTypes>();
    const activeConversation = conversation._id === id;

    const handleOnMouseOver = () => setShowIcon(prevState => !prevState);

    const handleCurrentConversationChange = (_id: string): void => {
        changeCurrentConversation(_id);
    };

    return (
        <ListItem
            className={
                `${ classes.layout } 
                 ${ activeConversation ? classes.activeConversation : '' }`
            }
            onMouseEnter={ handleOnMouseOver }
            onMouseLeave={ handleOnMouseOver }
            onClick={ () => handleCurrentConversationChange(conversation._id) }
        >
            <AvatarGroupWithBadges conversationUsers={ conversation.users } />
            <GroupedConversationUserNames conversationUsers={ conversation.users }/>
            {
                showIcon &&
                <Tooltip title='Delete conversation'>
                    <CancelOutlinedIcon
                        className={ classes.deleteIcon }
                        // onClick={ }
                    />
                </Tooltip>
            }
        </ListItem>
    );
};

export default ConversationItem;
