import HttpError from './HttpError';

class RefreshTokenMissingError implements HttpError {
    message: string;
    status: number;

    constructor() {
        this.message = 'Error: Refresh token is missing';
        this.status = 403;
    }
}

export default RefreshTokenMissingError;
