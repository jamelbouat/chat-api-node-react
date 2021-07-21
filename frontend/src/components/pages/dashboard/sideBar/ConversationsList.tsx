import React from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    activeConversation: {
        backgroundColor: 'rgba(233,243,255)'
    },
}));

const ConversationsList = () => {
    const classes = useStyles();
    return (
        <List>
            <ListItem className={ classes.activeConversation }>
                <ListItemText primary={ 'conversation 1' } />
            </ListItem>
            <ListItem>
                <ListItemText primary={ 'conversation 2' } />
            </ListItem>
            <ListItem>
                <ListItemText primary={ 'conversation 1' } />
            </ListItem>
            <ListItem>
                <ListItemText primary={ 'conversation 2' } />
            </ListItem>
            <ListItem>
                <ListItemText primary={ 'conversation 1' } />
            </ListItem>
            <ListItem>
                <ListItemText primary={ 'conversation 2' } />
            </ListItem>
            <ListItem>
                <ListItemText primary={ 'conversation 1' } />
            </ListItem>
            <ListItem>
                <ListItemText primary={ 'conversation 2' } />
            </ListItem>
            <ListItem>
                <ListItemText primary={ 'conversation 1' } />
            </ListItem>
            <ListItem>
                <ListItemText primary={ 'conversation 2' } />
            </ListItem>
            <ListItem>
                <ListItemText primary={ 'conversation 1' } />
            </ListItem>
            <ListItem>
                <ListItemText primary={ 'conversation 2' } />
            </ListItem>
        </List>

    );
};

export default ConversationsList;
