
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchApi = async (fetchPathname: string, requestOptions: RequestInit) => {
    try {
        const response = await fetch(`${ apiUrl }/${ fetchPathname }`, requestOptions);
        const data = await response.json();
        console.log('data= ',data);
        console.log(`url= ${ apiUrl }/${ fetchPathname }`);

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

