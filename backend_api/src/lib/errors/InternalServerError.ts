import HttpError from './HttpError';

class ObjectNotLoggedError implements HttpError {
    message: string;
    status: number;

    constructor(message?: string) {
        this.message = `Error: ${ message || 'Not logged' }`;
        this.status = 400;
    }
}

export default ObjectNotLoggedError;
