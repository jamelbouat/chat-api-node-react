import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

import { IUser } from '../../interfaces/user';
import { capitalizeFirstLetter, convertToReadableDate } from '../../utils/strings';

const useStyles = makeStyles({
    root: {
        fontSize: 14,
    },
    title: {
        marginTop: 4
    },
});

interface Props {
    currentUser: IUser
}

const Profile: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { currentUser } = props;

    return (
        <Card className={ classes.root }>
            <CardContent>
                <Typography className={ classes.title  } color="textSecondary" >
                    Name
                </Typography>
                <span>{ capitalizeFirstLetter(`${ currentUser.firstName } ${ currentUser.lastName }`) }</span>

                <Typography className={ classes.title  } color="textSecondary">
                    Email
                </Typography>
                <span>{ currentUser.email }</span>

                <Typography className={ classes.title  } color="textSecondary">
                    Account created at
                </Typography>
                <span>{ convertToReadableDate(currentUser.createdAt) }</span>

                <Typography className={ classes.title } color="textSecondary">
                    Last connection at
                </Typography>
                <span>{ convertToReadableDate(currentUser.updatedAt) }</span>
            </CardContent>
        </Card>
    );
};

export default Profile;
