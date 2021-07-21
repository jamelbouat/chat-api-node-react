import React, { FunctionComponent, useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, makeStyles, Tooltip } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import AvatarWithBadge from '../../../AvatarWithBadge';
import { capitalizeFirstLetter } from '../../../../utils/strings';
import { IUser } from '../../../../interfaces/user';

const useStyles = makeStyles(() => ({
    layout: {
        '&:hover': {
            backgroundColor: 'rgb(223,223,223)',
            borderRadius: '3px'
        }
    },
    cancelIcon: {
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
    status: boolean
}

const ConversationItem: FunctionComponent<Props> = ({ user, status }) => {
    const classes = useStyles();
    const [showIcon, setShowIcon] = useState(false);
    const handleOnMouseOver = () => setShowIcon(prevState => !prevState);

    return (
        <ListItem
            className={ classes.layout }
            key={ user._id }
            onMouseEnter={ handleOnMouseOver }
            onMouseLeave={ handleOnMouseOver }
        >
            <ListItemIcon>
                <AvatarWithBadge status={ status }/>
            </ListItemIcon>
            <ListItemText
                primary={ `${ capitalizeFirstLetter(user.firstName) } ${ capitalizeFirstLetter(user.lastName) }` }
            />
            {
                showIcon &&
                <Tooltip title='Delete conversation'>
                    <CancelOutlinedIcon
                        className={ classes.cancelIcon }
                        // onClick={ }
                    />
                </Tooltip>
            }
        </ListItem>
    );
};

export default ConversationItem;
