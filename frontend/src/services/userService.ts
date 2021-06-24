import { ILoginResponseData, ILoginValues, IRegisterValues } from '../interfaces';
import { fetchApi } from './fetchApi';
import { getAccessToken } from '../utils/tokens';

const loginPathname = process.env.REACT_APP_API_LOGIN_USER || '';
const registerPathname = process.env.REACT_APP_API_REGISTER_USER || '';
const getUsersPathname = process.env.REACT_APP_API_GET_USERS || '';
const stringifyBody = (values: ILoginValues | IRegisterValues) => JSON.stringify({ ...values });

const loginUser = async (values: ILoginValues) => {
    try {
        const user: ILoginResponseData = await fetchApi(loginPathname, 'POST', undefined, stringifyBody(values));
        return user;
    } catch (error) {
        throw error;
    }
};

const registerUser = async (values: IRegisterValues) => {
    try {
        return await fetchApi(registerPathname, 'POST', undefined, stringifyBody(values));
    } catch (error) {
        throw error;
    }
};

const getUsers = async () => {
    const accessToken = getAccessToken();
    const headers = new Headers({
        'Authorization': `Bearer ${ accessToken }`
    });

    try {
        return await fetchApi(getUsersPathname, 'GET', headers);
    } catch (error) {
        throw error;
    }
};

export const userService = {
    loginUser,
    registerUser,
    getUsers
};

