import React from 'react';
import { IUser } from '../../interfaces';

interface Props {
    user: IUser
}

const Profile: React.FC<Props> = (props) => {
    const { user } = props;

    return (
        <>
            <div>User</div>
            <pre>
                {
                    JSON.stringify(user, null, 2)
                }
            </pre>
        </>
    );
};

export default Profile;
