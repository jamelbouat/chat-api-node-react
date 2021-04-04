import express from 'express';
import IUser from './IUser';
import HttpError from '../errors/HttpError';

interface IService {
    model: IUser | any;
    objectNotCreatedError?: HttpError;
    createElement: (reqData: IUser) => Promise<express.Response>;
    getElement: (req: express.Request, res: express.Response, model: any) => Promise<void>;
    updateElement: (req: express.Request, res: express.Response, model: any) => Promise<void>;
    deleteElement: (req: express.Request, res: express.Response, model: any) => Promise<void>;
}

export default IService;
