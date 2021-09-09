import React, { FC, useState } from 'react';
import { ListItem, ListItemAvatar, ListItemText, makeStyles, Tooltip } from '@material-ui/core';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';

import { capitalizeFirstLetter } from '../../../../utils/strings';
import AvatarGroupWithBadges from '../../conversations/AvatarGroupWithBadges';
import { IUser } from '../../../../interfaces/user';

const useStyles = makeStyles(() => ({
    layout: {
        '&:hover': {
            backgroundColor: 'rgb(223,223,223)',
            borderRadius: '3px'
        }
    },
    messageIcon: {
        fontSize: '27px',
        cursor: 'pointer',
        '&:hover': {
            fontSize: '28px',
            color: 'rgb(63,81,180)'
        }
    }
}));

interface Props {
    user: IUser,
    status: boolean,
}

const ContactItem: FC<Props> = ({ user, status }) => {
    const classes = useStyles();
    const [showIcon, setShowIcon] = useState(false);
    const handleOnMouseOver = () => setShowIcon(prevState => !prevState);

    const handleClickedContact = () => {
        'hello';
    };

    return (
        <ListItem
            className={ classes.layout }
            key={ user._id }
            onMouseEnter={ handleOnMouseOver }
            onMouseLeave={ handleOnMouseOver }
        >
            <ListItemAvatar>
                <AvatarGroupWithBadges conversationUsers={ [ { _id: user._id, firstName: user.firstName, lastName: user.lastName }] }/>
            </ListItemAvatar>
            <ListItemText
                primary={ `${ capitalizeFirstLetter(user.firstName) } ${ capitalizeFirstLetter(user.lastName) }` }
            />
            {
                showIcon &&
                <Tooltip title='Send message'>
                    <MessageOutlinedIcon
                        className={ classes.messageIcon }
                        onClick={ handleClickedContact }
                    />
                </Tooltip>
            }
        </ListItem>
    );
};

export default ContactItem;
