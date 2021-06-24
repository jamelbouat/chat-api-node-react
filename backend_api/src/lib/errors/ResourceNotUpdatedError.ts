import HttpError from './commons/HttpError';

class ResourceNotUpdatedError extends HttpError {
    constructor(message?: string) {
        super(message || 'Error: Cannot update the resource');
        this.status = 404;
    }
}

export default ResourceNotUpdatedError;
