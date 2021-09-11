import React  from 'react';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar, makeStyles, Tooltip } from '@material-ui/core';

import { IConversationUser } from '../../../interfaces/conversations';
import { useCurrentUser } from '../../../context/CurrentUserProvider';
import { getFirstName, getFullName } from '../../../utils/user';
import BadgeComponent from '../../../containers/BadgeComponent';

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
                conversationUsers?.map((user, index) => (
                    !user ?
                        <Tooltip title={ 'Unknown user' } key={ index }>
                            <Avatar />
                        </Tooltip> :
                        user._id !== currentUser?._id &&
                        <BadgeComponent key={ user._id } conversationUser={ user }>
                            <Tooltip title={ getFullName(user) }>
                                <Avatar
                                    classes={ { root: classes.root } }
                                    alt={ getFirstName(user) }
                                    src={ getFullName(user) }
                                />
                            </Tooltip>
                        </BadgeComponent>
                ))
            }
        </AvatarGroup>
    );
};

export default AvatarGroupWithBadges;
