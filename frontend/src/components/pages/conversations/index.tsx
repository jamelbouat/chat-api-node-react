import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';

import SideBar from './sideBar';
import CurrentUserProvider from '../../../containers/CurrentUserProvider';
import ChatContainer from '../../../containers/ChatContainer';

const useStyles = makeStyles((theme: Theme) => ({
    layout: {
        height: '100%',
    },
    gridWrapper: {
        position: 'relative',
        height: '100%',
        padding: theme.spacing(1)
    },
    borderRight: {
        borderRight: '1px solid lightgrey'
    }
}));

const Conversations: React.FC = () => {
    const classes = useStyles();

    return (
        <CurrentUserProvider>
            <Grid container className={ classes.layout }>
                <Grid item xs={ 3 } className={ `${ classes.gridWrapper } ${ classes.borderRight }` }>
                    <SideBar />
                </Grid>
                <Grid item xs={ 9 } className={ classes.gridWrapper } >
                    <ChatContainer />
                </Grid>
            </Grid>
        </CurrentUserProvider>
    );
};

export { Conversations };
