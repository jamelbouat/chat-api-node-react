import { store } from '../index';
import { capitalizeFirstLetter } from './strings';
import { IConversationUser } from '../interfaces/conversations';

const getFullName = (user: IConversationUser): string =>
    `${ capitalizeFirstLetter(user.firstName) } ${ capitalizeFirstLetter(user.lastName) }`;

const getFirstName = (user: IConversationUser): string => `${ capitalizeFirstLetter(user.firstName) }`;

const isUserAuthenticated = (): boolean => store && store.getState().loginState.isAuthenticated;

export {
    getFirstName,
    getFullName,
    isUserAuthenticated
};
