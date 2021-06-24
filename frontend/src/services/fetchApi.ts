import { methodType } from '../interfaces';

const apiUrl = process.env.REACT_APP_API_URL;

const defaultHeaders = new Headers({
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json'
});

const combinedHeaders = (headers: Headers | undefined): void => {
    headers && headers.forEach((value, key) => {
        defaultHeaders.set(key, value);
    });
};

const requestOptions = (method: methodType, headers?: Headers, body?: string) => {
    combinedHeaders(headers);
    return {
        method,
        headers: defaultHeaders,
        body
    };
};

export const fetchApi = async (fetchPathname: string, method: methodType, headers?: Headers, body?: string) => {
    const options = requestOptions(method, headers, body);
    try {
        const response = await fetch(`${ apiUrl }/${ fetchPathname }`, options);
        const data = await response.json();
        console.log('Response data= ', data);
        console.log(`URL = ${ apiUrl }/${ fetchPathname }`);

        if (response.status >= 200 && response.status < 300) {
            // const contentType = response.headers.get('Content-Type');
            // if (contentType === 'application/json') {
            return data;
            // }
        } else {
            throw new Error(data.message);
        }

    } catch (error) {
        throw error;
    }
};

