import HttpError from './commons/HttpError';

class AccessUnauthorizedError extends HttpError {
    constructor() {
        super('Access unauthorized');
        this.status = 401;
    }
}

export default AccessUnauthorizedError;
