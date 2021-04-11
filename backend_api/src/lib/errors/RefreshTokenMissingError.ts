import HttpError from './HttpError';

class AuthTokenMissingError implements HttpError {
    message: string;
    status: number;

    constructor() {
        this.message = 'Error: Authorization token is missing';
        this.status = 403;
    }
}

export default AuthTokenMissingError;
