import HttpError from './HttpError';

class PageNotFoundError implements HttpError {
    message: string;
    status: number;

    constructor() {
        this.message = 'Error: Page not found';
        this.status = 404;
    }
}

export default PageNotFoundError;
