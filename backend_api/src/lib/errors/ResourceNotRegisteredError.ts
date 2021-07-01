import HttpError from './commons/HttpError';

class ResourceNotRegisteredError extends HttpError {
    constructor(message?: string) {
        super(message || 'Error: Resource not created');
        this.status = 400;
    }
}

export default ResourceNotRegisteredError;
