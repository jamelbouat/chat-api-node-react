import React, { createContext, useContext } from 'react';

import { IUser } from '../interfaces/user';

interface Props {
    currentUser: IUser | null,
    children: React.ReactElement;
}

const CurrentUserContext = createContext<IUser | null>(null);

const CurrentUserProvider: React.FC<Props>  = ({ currentUser, children }) => {

    return (
        <CurrentUserContext.Provider value={ currentUser } >
            { children }
        </CurrentUserContext.Provider>
    );
};

const useCurrentUser = () => useContext(CurrentUserContext);

export {
    CurrentUserProvider,
    useCurrentUser
};
