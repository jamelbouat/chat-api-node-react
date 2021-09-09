export const BASE_URL = '/api';

const USER_URL = `${ BASE_URL }/user`;
export const POST_USER_URL = `${ USER_URL }/register`;
export const LOGIN_USER_URL = `${ USER_URL }/login`;
export const GET_NEW_USER_TOKEN_URL = `${ USER_URL }/token`;
export const LOGOUT_USER_URL = `${ USER_URL }/logout`;
export const GET_USER_URL = `${ USER_URL }/id/:id`;
export const UPDATE_USER_URL = `${ USER_URL }/id/:id`;
export const DELETE_USER_URL = `${ USER_URL }/id/:id`;
export const ALL_USERS_URL = `${ USER_URL }/all`;

const CONVERSATION_URL = `${ BASE_URL }/conversation`;
export const POST_CONVERSATION_URL = `${ CONVERSATION_URL }/new`;
export const GET_CONVERSATION_URL = `${ CONVERSATION_URL }/id/:id`;
export const UPDATE_CONVERSATION_URL = `${ CONVERSATION_URL }/id/:id`;
export const DELETE_CONVERSATION_URL = `${ CONVERSATION_URL }/id/:id`;
export const ALL_CONVERSATIONS_URL = `${ CONVERSATION_URL }/all`;
export const DELETE_MESSAGE_FROM_CONVERSATION_URL = `${ CONVERSATION_URL }/message`;

const MESSAGE_URL = `${ BASE_URL }/message`;
export const GET_MESSAGE_URL = `${ MESSAGE_URL }/id/:id`;
export const DELETE_MESSAGE_URL = `${ MESSAGE_URL }/id/:id`;
export const ALL_MESSAGES_URL = `${ MESSAGE_URL }/all/:conversationId`;

