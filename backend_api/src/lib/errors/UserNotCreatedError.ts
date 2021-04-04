import HttpError from './HttpError';

class UserNotCreatedError implements HttpError {
    message: string;
    status: number;

    constructor() {
        this.message = 'Error: User not created';
        this.status = 400;
    }
}

export default UserNotCreatedError;
