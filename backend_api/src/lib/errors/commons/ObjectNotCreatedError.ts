import HttpError from '../HttpError';

class ObjectNotFoundError implements HttpError {
    message: string;
    status: number;

    constructor() {
        this.message = 'Error: Resource not created';
        this.status = 400;
    }
}

export default ObjectNotFoundError;
