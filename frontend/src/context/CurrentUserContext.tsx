import React, { createContext, useContext } from 'react';

import { IUser } from '../interfaces/user';

interface Props {
    currentUser: IUser | null,
    children: React.ReactElement;
}

const CurrentUserContext = createContext<IUser | null>(null);

const CurrentUserContextProvider: React.FC<Props>  = (props) => {
    const { currentUser, children } = props;

    return (
        <CurrentUserContext.Provider value={ currentUser } >
            { children }
        </CurrentUserContext.Provider>
    );
};

const useCurrentUserContext = () => useContext(CurrentUserContext);

export {
    CurrentUserContextProvider,
    useCurrentUserContext
};
