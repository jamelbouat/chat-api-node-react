import express from 'express';
import IUser from './IUser';

interface IService {
    model: IUser | any;
    registerElement: (reqData: IUser) => Promise<IUser | any>;
    getElement: (req: express.Request, res: express.Response, model: any) => Promise<void>;
    updateElement: (req: express.Request, res: express.Response, model: any) => Promise<void>;
    deleteElement: (req: express.Request, res: express.Response, model: any) => Promise<void>;
}

export default IService;
