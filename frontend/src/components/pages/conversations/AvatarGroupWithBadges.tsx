import React  from 'react';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar, Badge, makeStyles, Tooltip } from '@material-ui/core';

import { IConversationUser } from '../../../interfaces/conversations';
import { useCurrentUser } from '../../../context/CurrentUserProvider';
import { getFirstName, getFullName } from '../../../utils/user';

const useStyles = makeStyles(() => ({
    badge: {
        border: 'none',
        height: 35
    },
    root: {
        border: '2px solid white',
        fontSize: '1em',
        padding: '.3em',
    },
    avatar: {
        fontSize: '1em',
    },
    onlineBadge: {
        backgroundColor: 'green'
    },
    offlineBadge: {
        backgroundColor: 'red'
    }
}));

interface Props {
    conversationUsers: IConversationUser[]
}

const AvatarGroupWithBadges: React.FC<Props> = ({ conversationUsers }) => {
    const classes = useStyles();
    const currentUser = useCurrentUser();

    return (
        <AvatarGroup max={ 3 } spacing={ 12 } classes={ { avatar: classes.avatar } }>
            {
                conversationUsers &&
                conversationUsers.map((user, index) => (
                    !user ?
                        <Tooltip title={ 'Unknown user' } key={ index }>
                            <Avatar />
                        </Tooltip> :
                        user._id !== currentUser?._id &&
                        <Badge
                            className={ classes.badge }
                            classes={ { badge: status ? classes.onlineBadge : classes.offlineBadge } }
                            key={ user._id }
                            variant='dot'
                            overlap='circular'
                            anchorOrigin={ {
                                vertical: 'bottom',
                                horizontal: 'right',
                            } }
                        >
                            <Tooltip title={ getFullName(user) }>
                                <Avatar
                                    classes={ { root: classes.root } }
                                    alt={ getFirstName(user) }
                                    src={ getFullName(user) }
                                />
                            </Tooltip>
                        </Badge>
                ))
            }
        </AvatarGroup>
    );
};

export default AvatarGroupWithBadges;
