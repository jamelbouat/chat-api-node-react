import React from 'react';
import { AppBar, Button, makeStyles, Toolbar, Typography, Tooltip, Grid } from '@material-ui/core';
import { ForumRounded as MessagesIcon, Chat as ChatIcon,
    ExitToApp as ExitToAppIcon, NotificationsRounded as NotificationsRoundedIcon,
    AccountBoxRounded as AccountBoxRoundedIcon, Home as HomeIcon
} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    iconsLayout: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    logo: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        cursor: 'pointer',
        '&:hover': {
            opacity: '0.5'
        },
        margin: '0 9px',
        fontSize: '32px'
    }
}));

interface Props {
    isAuthenticated: boolean;
    redirectToDashboard: () => void;
    redirectToConversations: () => void;
    redirectToProfile: () => void;
    logoutUser: () => void;
    redirectToLogin: () => void;
    redirectToRegister: () => void
}

const NavigationBar: React.FC<Props> = (props) => {
    const classes = useStyles();
    const {
        isAuthenticated,
        redirectToDashboard,
        redirectToConversations,
        redirectToProfile,
        logoutUser,
        redirectToLogin,
        redirectToRegister
    } = props;

    const handleHomeIconClick = () => redirectToDashboard();
    const handleConversationsIconClick = () => redirectToConversations();
    const handleProfileIconClick = () => redirectToProfile();
    const handleLogout = () => logoutUser();
    const handleLoginClick = () => redirectToLogin();
    const handleRegisterClick = () => redirectToRegister();

    return(
        <AppBar position='relative'>
            <Toolbar>
                <Grid container>
                    <Grid item xs={ 4 } className={ classes.logo }>
                        <ChatIcon />
                        <Typography variant='h6'>
                            TextMe
                        </Typography>
                    </Grid>
                    {
                        !isAuthenticated ?
                            <Grid item xs={ 8 } className={ classes.iconsLayout }>
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
                            </Grid> :
                            <Grid item xs={ 8 } className={ classes.iconsLayout }>
                                <Tooltip title='Home' arrow>
                                    <HomeIcon
                                        onClick={ handleHomeIconClick }
                                        className={ classes.icon }
                                    />
                                </Tooltip>
                                <Tooltip title='Conversations' arrow>
                                    <MessagesIcon
                                        onClick={ handleConversationsIconClick }
                                        className={ classes.icon }
                                    />
                                </Tooltip>
                                <Tooltip title='Notifications' arrow>
                                    <NotificationsRoundedIcon
                                        onClick={ handleHomeIconClick }
                                        className={ classes.icon }
                                    />
                                </Tooltip>
                                <Tooltip title='My profile' arrow>
                                    <AccountBoxRoundedIcon
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
                            </Grid>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
