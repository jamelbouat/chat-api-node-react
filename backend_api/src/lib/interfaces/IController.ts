import express, { Router } from 'express';
import IService from './IService';
import IUser from './IUser';
import HttpError from '../errors/HttpError';

interface IController {
    service: IService | any;
    router: Router;
    registerElement: (req: express.Request, res: express.Response) => Promise<IUser | HttpError>;
    getElement: (req: express.Request, res: express.Response) => Promise<express.Response>;
    updateElement: (req: express.Request, res: express.Response) => Promise<void>;
    deleteElement: (req: express.Request, res: express.Response) => Promise<void>;
}

export default IController;
