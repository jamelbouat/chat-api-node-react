import express from 'express';
import PageNotFoundError from '../errors/PageNotFoundError';

const NotFoundController = () => {
    return (req: express.Request, res: express.Response) => {
        const error = new PageNotFoundError();

        return res.status(error.status).json({message: error.message});
    };
};

export default NotFoundController;
