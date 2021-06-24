import { store } from '../index';

export const getAccessToken = (): string => {
    return store && store.getState().tokensState.accessToken.token || '';
};
