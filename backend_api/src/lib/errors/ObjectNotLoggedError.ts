import HttpError from './commons/HttpError';

class ObjectNotLoggedError extends HttpError {
    constructor(message?: string) {
        super(message || 'Error: Not logged');
        this.status = 400;
    }
}

export default ObjectNotLoggedError;
