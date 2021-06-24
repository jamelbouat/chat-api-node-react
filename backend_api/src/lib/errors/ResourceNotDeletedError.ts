import HttpError from './commons/HttpError';

class ResourceNotDeletedError extends HttpError {
    constructor(message?: string) {
        super(message || 'Error: Cannot delete the resource');
        this.status = 404;
    }
}

export default ResourceNotDeletedError;
