import { getAccessToken } from '../utils/tokens';
import { fetchApi } from './fetchApi';

const getConversationsPathname = process.env.REACT_APP_API_GET_CONVERSATIONS || '';
const newConversationPathname = process.env.REACT_APP_API_ADD_NEW_CONVERSATION || '';
const removeConversationPathname = process.env.REACT_APP_API_DELETE_CONVERSATION || '';
const stringifyBody = (userIds: string[]) => JSON.stringify({ userIds });

const accessToken = getAccessToken();
const headers = new Headers({
    'Authorization': `Bearer ${ accessToken }`
});

const getConversations = async () => {
    try {
        return await fetchApi(getConversationsPathname, 'GET', headers);
    } catch (error) {
        throw error;
    }
};

const addNewConversation = async (userIds: string[]) => {
    try {
        return await fetchApi(newConversationPathname, 'POST', headers, stringifyBody(userIds));
    } catch (error) {
        throw error;
    }
};

const removeConversation = async (_id: string) => {
    try {
        return await fetchApi(`${ removeConversationPathname }/${ _id }`, 'DELETE', headers);
    } catch (error) {
        throw error;
    }
};

export const conversationsService = {
    getConversations,
    addNewConversation,
    removeConversation
};
