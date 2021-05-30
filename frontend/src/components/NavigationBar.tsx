import { AppBar, Button, makeStyles, Toolbar, Typography, Tooltip } from '@material-ui/core';
import { Chat as ChatIcon, ExitToApp as ExitToAppIcon, AccountBoxRounded, Home as HomeIcon } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1
    },
    icon: {
        cursor: 'pointer',
        '&:hover': {
            opacity: '0.5'
        },
        margin: '0 8px',
        fontSize: '32px'
    }
}));

interface Props {
    isAuthenticated: boolean;
    viewProfile: () => void;
    logoutUser: () => void;
    redirectToDashboard: () => void;
    redirectToLogin: () => void;
    redirectToRegister: () => void
}

const NavigationBar: React.FC<Props> = (props) => {
    const classes = useStyles();
    const {
        isAuthenticated,
        viewProfile,
        logoutUser,
        redirectToDashboard,
        redirectToLogin,
        redirectToRegister
    } = props;

    const handleLogout = () => logoutUser();
    const handleProfileIconClick = () => viewProfile();
    const handleHomeIconClick = () => redirectToDashboard();
    const handleLoginClick = () => redirectToLogin();
    const handleRegisterClick = () => redirectToRegister();

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
                            <Button
                                color='inherit'
                                onClick={ handleLoginClick }
                            >
                                Sign in
                            </Button>
                            <Button
                                color='inherit'
                                variant='outlined'
                                onClick={ handleRegisterClick }
                            >
                                Sign up
                            </Button>
                        </> :
                        <>
                            <Tooltip title='Home' arrow>
                                <HomeIcon
                                    onClick={ handleHomeIconClick }
                                    className={ classes.icon }
                                />
                            </Tooltip>
                            <Tooltip title='My profile' arrow>
                                <AccountBoxRounded
                                    onClick={ handleProfileIconClick }
                                    className={ classes.icon }
                                />
                            </Tooltip>
                            <Tooltip title='Logout' arrow>
                                <ExitToAppIcon
                                    onClick={ handleLogout }
                                    className={ classes.icon }
                                />
                            </Tooltip>
                        </>
                }
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
