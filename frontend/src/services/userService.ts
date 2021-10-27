import { fetchApi } from './fetchApi';
import { getAccessToken } from '../utils/tokens';
import { ILoginFormValues, ILoginResponseData, IRegisterFormValues, IUser } from '../interfaces/user';

const loginPathname = process.env.REACT_APP_API_LOGIN_USER || '';
const registerPathname = process.env.REACT_APP_API_REGISTER_USER || '';
const getUserPathname = process.env.REACT_APP_API_GET_USER || '';
const getUsersPathname = process.env.REACT_APP_API_GET_USERS || '';
const stringifyBody = (values: ILoginFormValues | IRegisterFormValues) => JSON.stringify({ ...values });

const getHeaders = () => {
    const accessToken = () => getAccessToken();
    return new Headers({
        'Authorization': `Bearer ${ accessToken() }`
    });
};

const loginUser = async (values: ILoginFormValues): Promise<ILoginResponseData> => {
    try {
        return await fetchApi(loginPathname, 'POST', undefined, stringifyBody(values));
    } catch (error) {
        throw error;
    }
};

const registerUser = async (values: IRegisterFormValues): Promise<{ message: string } | Error> => {
    try {
        return await fetchApi(registerPathname, 'POST', undefined, stringifyBody(values));
    } catch (error) {
        throw error;
    }
};

const getUser = async (_id: string): Promise<IUser | Error> => {
    try {
        return await fetchApi(`${ getUserPathname }/${ _id }`, 'GET', getHeaders());
    } catch (error) {
        throw error;
    }
};

const getUsers = async (): Promise<IUser[]> => {
    try {
        return await fetchApi(getUsersPathname, 'GET', getHeaders());
    } catch (error) {
        throw error;
    }
};

export const userService = {
    loginUser,
    registerUser,
    getUsers
};

