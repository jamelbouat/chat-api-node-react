import HttpError from './HttpError';

class AccessForbiddenError implements HttpError {
    message: string;
    status: number;

    constructor() {
        this.message = 'Error: Access forbidden';
        this.status = 403;
    }
}

export default AccessForbiddenError;
