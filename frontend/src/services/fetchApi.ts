
// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = 'http://localhost:4300/api';

export const fetchApi = async (fetchUrl: string, requestOptions: RequestInit) => {
    try {
        const response = await fetch(`${ apiUrl }/${ fetchUrl }`, requestOptions);
        const data = await response.json();
        console.log('data=',data);

        if (response.status >= 200 && response.status < 300) {
            // const contentType = response.headers.get('Content-Type');
            // if (contentType === 'application/json') {
            return data;
            // }
        } else {
            throw data;
        }

    } catch (error) {
        throw error;
    }
};

