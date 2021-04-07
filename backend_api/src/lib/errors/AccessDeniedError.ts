import HttpError from './HttpError';

class AccessDeniedError implements HttpError {
    message: string;
    status: number;

    constructor() {
        this.message = 'Error: Access denied';
        this.status = 401;
    }
}

export default AccessDeniedError;
