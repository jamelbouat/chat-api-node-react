import React from 'react';
import { Card, CardActions, CardContent, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { AccountBoxRounded as AccountBoxRoundedIcon, MessageOutlined as MessageOutlinedIcon } from '@material-ui/icons';

import { capitalizeFirstLetter, convertToReadableDate } from '../../../../utils/strings';
import { IUser } from '../../../../interfaces/user';
import { getFullName } from '../../../../utils/user';

const useStyles = makeStyles({
    root: {
        fontSize: 14,
    },
    title: {
        marginTop: 4
    },
    icon: {
        color: 'rgb(63,81,180)',
        fontSize: '27px',
        cursor: 'pointer',
        '&:hover': {
            fontSize: '28px',
        }
    }
});

interface Props {
    user: IUser,
    redirectToContactProfile: (_id: string) => void,
    addNewConversation: (_id: string) => void
}

const ContactsCard: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { user, redirectToContactProfile, addNewConversation } = props;

    const handleClickedConversationIcon = () => {
        addNewConversation(user._id);
    };

    const handleClickedProfileIcon = () => {
        redirectToContactProfile(user._id);
    };

    return(
        <Card className={ classes.root }>
            <CardContent>
                <Typography className={ classes.title  } color="textSecondary" >
                    Name
                </Typography>
                <span>{ getFullName(user) }</span>

                <Typography className={ classes.title  } color="textSecondary">
                    Email
                </Typography>
                <span>{ user.email }</span>

                <Typography className={ classes.title  } color="textSecondary">
                    Account created at
                </Typography>
                <span>{ convertToReadableDate(user.createdAt) }</span>

                <Typography className={ classes.title } color="textSecondary">
                    Last connection at
                </Typography>
                <span>{ convertToReadableDate(user.updatedAt) }</span>
            </CardContent>
            <CardActions>
                <Tooltip title='Send message'>
                    <MessageOutlinedIcon
                        className={ classes.icon }
                        onClick={ handleClickedConversationIcon }
                    />
                </Tooltip>
                <Tooltip title='View profile'>
                    <AccountBoxRoundedIcon
                        className={ classes.icon }
                        onClick={ handleClickedProfileIcon }
                    />
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default ContactsCard;
