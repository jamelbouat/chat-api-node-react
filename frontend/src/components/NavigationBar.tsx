import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Chat as ChatIcon, ExitToApp as ExitToAppIcon, AccountBoxRounded } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { ROUTES } from '../constants';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    icon: {
        cursor: 'pointer',
        '&:hover': {
            opacity: '0.5'
        },
        margin: '0 5px',
        fontSize: '36px'
    }
}));

interface Props {
    isAuthenticated: boolean;
    viewProfile: () => void;
    logoutUser: () => void
}

const NavigationBar: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { isAuthenticated, viewProfile, logoutUser } = props;

    const handleLogout = () => {
        logoutUser();
    };

    const handleProfileIconClick = () => {
        viewProfile();
    };

    return(
        <AppBar position='relative'>
            <Toolbar>
                <ChatIcon />
                <Typography variant='h6' className={ classes.title }>
                    TextMe
                </Typography>

                {
                    !isAuthenticated ?
                        <>
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
                        </> :
                        <>
                            <AccountBoxRounded
                                onClick={ handleProfileIconClick }
                                titleAccess='My profile'
                                className={ classes.icon }
                            />
                            <ExitToAppIcon
                                onClick={ handleLogout }
                                titleAccess='Logout'
                                className={ classes.icon }
                            />
                        </>
                }
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
