import HttpError from './commons/HttpError';

class InternalServerError extends HttpError {
    constructor() {
        super('Internal server Error');
        this.status = 500;
    }
}

export default InternalServerError;
