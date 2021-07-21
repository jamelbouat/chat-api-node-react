import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

import { capitalizeFirstLetter, convertToReadableDate } from '../utils/strings';
import { IUser } from '../interfaces/user';

const useStyles = makeStyles({
    root: {
        width: 600,
        margin: '30px auto'
    },
    title: {
        fontSize: 14,
        marginTop: 15
    }
});

interface Props {
    user: IUser
}

const UserCard: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { user } = props;

    return(
        <Card className={ classes.root }>
            <CardContent>
                <Typography className={ classes.title } color="textSecondary">
                First name
                </Typography>
                <span>{ capitalizeFirstLetter(user.firstName) }</span>
                <Typography className={ classes.title  } color="textSecondary" >
                Last name
                </Typography>
                <span>{ capitalizeFirstLetter(user.lastName) }</span>
                <Typography className={ classes.title  } color="textSecondary">
                Email
                </Typography>
                <span>{ user.email }</span>
                <Typography className={ classes.title  } color="textSecondary">
                Account created at
                </Typography>
                <span>{ convertToReadableDate(user.createdAt) }</span>
                <Typography className={ classes.title  } color="textSecondary">
                Last connection at
                </Typography>
                <span>{ convertToReadableDate(user.updatedAt) }</span>
            </CardContent>
        </Card>
    );
};

export default UserCard;
