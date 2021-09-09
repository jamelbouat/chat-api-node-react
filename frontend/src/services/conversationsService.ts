import { getAccessToken } from '../utils/tokens';
import { fetchApi } from './fetchApi';

const getConversationsPathname = process.env.REACT_APP_API_GET_CONVERSATIONS || '';
const getConversationPathname = process.env.REACT_APP_API_GET_CONVERSATION || '';
const newConversationPathname = process.env.REACT_APP_API_ADD_NEW_CONVERSATION || '';
const deleteConversationPathname = process.env.REACT_APP_API_DELETE_CONVERSATION || '';
const stringifyBody = (userIds: string[]) => JSON.stringify({ userIds });

const getHeaders = () => {
    const accessToken = () => getAccessToken();
    return new Headers({
        'Authorization': `Bearer ${ accessToken() }`
    });
};

const getConversations = async () => {
    try {
        return await fetchApi(getConversationsPathname, 'GET', getHeaders());
    } catch (error) {
        throw error;
    }
};

const getConversation = async (_id: string) => {
    try {
        return await fetchApi(`${ getConversationPathname }/${ _id }`, 'GET', getHeaders());
    } catch (error) {
        throw error;
    }
};


const addNewConversation = async (userIds: string[]) => {
    try {
        return await fetchApi(newConversationPathname, 'POST', getHeaders(), stringifyBody(userIds));
    } catch (error) {
        throw error;
    }
};

const removeConversation = async (_id: string) => {
    try {
        return await fetchApi(`${ deleteConversationPathname }/${ _id }`, 'DELETE', getHeaders());
    } catch (error) {
        throw error;
    }
};

export const conversationsService = {
    getConversations,
    addNewConversation,
    removeConversation
};
