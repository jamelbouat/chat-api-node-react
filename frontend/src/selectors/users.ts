import { Selector } from 'react-redux';

import { RootState } from '../interfaces/state';
import { IUser } from '../interfaces/user';

const currentUserSelector: Selector<RootState, IUser> = state =>
    state.loginState.user;

const isUserAuthenticatedSelector: Selector<RootState, boolean> = state =>
    state.loginState.isAuthenticated;

const usersSelector: Selector<RootState, IUser[]> = state =>
    state.usersState.users;

export {
    currentUserSelector,
    isUserAuthenticatedSelector,
    usersSelector
};
