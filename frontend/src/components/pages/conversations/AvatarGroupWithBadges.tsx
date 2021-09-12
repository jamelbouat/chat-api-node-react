import React  from 'react';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar, makeStyles, Tooltip } from '@material-ui/core';

import { IConversationUser } from '../../../interfaces/conversations';
import { useCurrentUser } from '../../../context/CurrentUserProvider';
import { getFirstName, getFullName } from '../../../utils/user';
import BadgeComponent from '../../../containers/BadgeComponent';

const useStyles = makeStyles(() => ({
    avatarRoot: {
        border: '2px solid white',
        fontSize: '1em'
    },
    avatar: {
        fontSize: '1em'
    },
    groupRoot:{
        marginLeft: 8
    }
}));

interface Props {
    conversationUsers: IConversationUser[]
}

const AvatarGroupWithBadges: React.FC<Props> = ({ conversationUsers }) => {
    const classes = useStyles();
    const currentUser = useCurrentUser();

    return (
        <AvatarGroup max={ 3 } spacing={ 12 } classes={ { root: classes.groupRoot, avatar: classes.avatar } }>
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
                                    classes={ { root: classes.avatarRoot } }
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
