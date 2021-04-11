import HttpError from './HttpError';

class InternalServerError implements HttpError {
    message: string;
    status: number;

    constructor() {
        this.message = 'Error: Internal server Error';
        this.status = 500;
    }
}

export default InternalServerError;
