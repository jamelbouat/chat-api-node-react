import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import AddConversationGroupButton from '../../../../containers/AddConversationGroupButton';
import ConversationsList from '../../../../containers/ConversationsList';

const useStyles = makeStyles(() => ({
    layout: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
    }
}));

const SideBar: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={ classes.layout }>
            <Typography variant='h5' align='center'>Conversations</Typography>
            <ConversationsList />
            <AddConversationGroupButton />
        </div>
    );
};

export default SideBar;
