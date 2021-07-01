import HttpError from './commons/HttpError';

class UserNotLoggedError extends HttpError {
    constructor(message?: string) {
        super(message || 'Error: Not logged');
        this.status = 400;
    }
}

export default UserNotLoggedError;
