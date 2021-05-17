import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Chat } from '@material-ui/icons';
import React from 'react';
import {ROUTES} from '../constants';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1
    },
    link: {
        textDecoration: 'inherit',
        color: 'inherit'
    }
}));

interface Props {
    routeChange: (pathname: ROUTES) => void
}

const NavigationBar: React.FC<Props> = (props) => {
    const classes = useStyles();

    return(
        <AppBar position='relative'>
            <Toolbar>
                <Chat/>
                <Typography variant='h6' className={ classes.title }>
                    TextMe
                </Typography>

                <Link to={ ROUTES.LOGIN } className={ classes.link }>
                    <Button color='inherit'>
                        Sign in
                    </Button>
                </Link>

                <Link to={ ROUTES.REGISTER } className={ classes.link }>
                    <Button color='inherit' variant='outlined'>
                        Sign up
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
