import HttpError from './HttpError';

class AuthenticationTokenMissingError implements HttpError {
    message: string;
    status: number;

    constructor() {
        this.message = 'Error: Authentication token is missing';
        this.status = 401;
    }
}

export default AuthenticationTokenMissingError;
