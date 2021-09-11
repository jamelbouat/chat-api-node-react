import { Selector } from 'react-redux';

import { RootState } from '../interfaces/state';
import { IUser } from '../interfaces/user';

const currentUserSelector: Selector<RootState, IUser> = state =>
    state.loginState.user;

const isUserAuthenticatedSelector: Selector<RootState, boolean> = state =>
    state.loginState.isAuthenticated;

const usersSelector: Selector<RootState, IUser[]> = state =>
    state.usersState.users;

const conversationUserStatusSelector = (state: RootState, userId: string): boolean | undefined => {
    const users = usersSelector(state);
    const user = users.find(user => user._id === userId);
    return user ? user.online : undefined;
};

export {
    currentUserSelector,
    isUserAuthenticatedSelector,
    usersSelector,
    conversationUserStatusSelector
};
