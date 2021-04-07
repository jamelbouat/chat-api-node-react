import HttpError from './HttpError';

class ObjectNotRegisteredError implements HttpError {
    message: string;
    status: number;

    constructor(message?: string) {
        this.message = `Error: ${ message || 'Resource not created' }`;
        this.status = 400;
    }
}

export default ObjectNotRegisteredError;
