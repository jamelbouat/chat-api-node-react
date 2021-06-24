import React from 'react';

import { IUser } from '../../interfaces';
import UserCard from '../UserCard';

interface Props {
    user: IUser
}

const Profile: React.FC<Props> = (props) => {
    const { user } = props;

    return (
        <UserCard user = { user } />
    );
};

export default Profile;
