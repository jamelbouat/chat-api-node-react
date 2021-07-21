import React, { FunctionComponent } from 'react';
import { Badge, makeStyles, Avatar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    onlineBadge: {
        backgroundColor: 'green'
    },
    offlineBadge: {
        backgroundColor: 'red'
    },
}));

interface Props {
    status: boolean
}

const AvatarWithBadge: FunctionComponent<Props> = (props) => {
    const { status } = props;
    const classes = useStyles();

    return (
        <Badge
            classes={ { badge: status ? classes.onlineBadge : classes.offlineBadge } }
            variant='dot'
            overlap='circle'
            anchorOrigin={ {
                vertical: 'bottom',
                horizontal: 'right',
            } }
        >
            <Avatar />
        </Badge>
    );
};

export default AvatarWithBadge;
