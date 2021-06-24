import HttpError from './commons/HttpError';

class AccessForbiddenError extends HttpError {
    constructor() {
        super('Access forbidden');
        this.status = 403;
    }
}

export default AccessForbiddenError;
