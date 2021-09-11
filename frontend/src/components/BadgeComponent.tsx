import React from 'react';
import { Badge, makeStyles } from '@material-ui/core';
import { IConversationUser } from '../interfaces/conversations';

const useStyles = makeStyles(() => ({
    badge: {
        border: 'none',
        height: 35
    },
    onlineStatus: {
        backgroundColor: 'green'
    },
    offlineStatus: {
        backgroundColor: 'red'
    }
}));

interface Props {
    children:  JSX.Element[] | JSX.Element;
    conversationUser: IConversationUser;
    status: boolean | undefined
}

const BadgeComponent: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { children, status } = props;

    return (
        <Badge
            className={ classes.badge }
            classes={ { badge: status ? classes.onlineStatus : classes.offlineStatus } }
            variant='dot'
            overlap='circular'
            anchorOrigin={ {
                vertical: 'bottom',
                horizontal: 'right',
            } }
        >
            { children }
        </Badge>
    );
};

export default BadgeComponent;
