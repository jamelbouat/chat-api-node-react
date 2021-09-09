import { fetchApi } from './fetchApi';
import { getAccessToken } from '../utils/tokens';

const getMessagesPathname = process.env.REACT_APP_API_GET_MESSAGES || '';

const getHeaders = () => {
    const accessToken = () => getAccessToken();
    return new Headers({
        'Authorization': `Bearer ${ accessToken() }`
    });
};

const getConversationMessages = async (conversationId: string) => {
    try {
        return await fetchApi(`${ getMessagesPathname }/${ conversationId }`, 'GET', getHeaders());
    } catch (error) {
        throw error;
    }
};

export const messagesService = {
    getConversationMessages
};
