export const BASE_URL = '/api';

const USER_URL = `${ BASE_URL }/user`;
export const POST_USER_URL = `${ USER_URL }/register`;
export const GET_USER_URL = `${ USER_URL }/:id`;
export const UPDATE_USER_URL = `${ USER_URL }/:id`;
export const DELETE_USER_URL = `${ USER_URL }/:id`;
export const LOGIN_USER_URL = `${ USER_URL }/login`;
export const LOGOUT_USER_URL = `${ USER_URL }/logout`;
export const ALL_USER_URL = `${ USER_URL }/all`;
