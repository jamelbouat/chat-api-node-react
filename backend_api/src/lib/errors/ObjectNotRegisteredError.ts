import HttpError from './commons/HttpError';

class ObjectNotRegisteredError extends HttpError {
    constructor(message?: string) {
        super(message || 'Error: Resource not created');
        this.status = 400;
    }
}

export default ObjectNotRegisteredError;
