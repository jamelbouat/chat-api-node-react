import { ILoginResponseData, ILoginValues, IRegisterValues } from '../interfaces';
import { fetchApi } from './fetchApi';

const requestOptions = (values: ILoginValues | IRegisterValues) => ({
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...values })
});

const loginUser = async (values: ILoginValues) => {
    try {
        const user: ILoginResponseData = await fetchApi('user/login', requestOptions(values));
        return user;

    } catch (error) {
        throw error;
    }
};

const registerUser = async (values: IRegisterValues) => {
    try {
        return await fetchApi('user/register', requestOptions(values));

    } catch (error) {
        throw error;
    }
};

export const userService = {
    loginUser,
    registerUser
};

