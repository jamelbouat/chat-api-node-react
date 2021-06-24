import { Request, Response, NextFunction } from 'express';

import HttpError from '../errors/commons/HttpError';

const errorHandlerMiddleware = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).send({ status, message });
};

export default errorHandlerMiddleware;
