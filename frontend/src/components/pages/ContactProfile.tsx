import React from 'react';
import { useParams } from 'react-router-dom';

const ContactProfile = () => {
    const { id }: { id: string } = useParams();

    return (
        <>
            <div>Contact Profile</div>
            <div>{ id }</div>
        </>

    );
};

export default ContactProfile;
