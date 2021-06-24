import HttpError from './commons/HttpError';

class RefreshTokenMissingError extends HttpError {
    constructor() {
        super('Refresh token is missing');
        this.status = 403;
    }
}

export default RefreshTokenMissingError;
