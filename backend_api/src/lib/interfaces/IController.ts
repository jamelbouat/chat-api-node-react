import express, { Router } from 'express';
import IService from './IService';

interface IController {
    service: IService | undefined;
    router: Router;
    createElement: (req: express.Request, res: express.Response) => Promise<express.Response>;
    getElement: (req: express.Request, res: express.Response) => Promise<express.Response>;
    updateElement: (req: express.Request, res: express.Response) => Promise<void>;
    deleteElement: (req: express.Request, res: express.Response) => Promise<void>;
}

export default IController;
