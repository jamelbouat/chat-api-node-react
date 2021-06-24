import HttpError from './commons/HttpError';

class AccessTokenMissingError extends HttpError {
    constructor() {
        super('Access token is missing');
        this.status = 403;
    }
}

export default AccessTokenMissingError;
