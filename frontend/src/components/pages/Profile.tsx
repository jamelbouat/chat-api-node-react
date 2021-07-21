import React from 'react';

import UserCard from '../UserCard';
import { IUser } from '../../interfaces/user';

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
