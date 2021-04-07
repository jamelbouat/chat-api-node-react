import express, {Router} from 'express';
import IController from '../interfaces/IController';
import IService from '../interfaces/IService';
import IUser from '../interfaces/IUser';
import HttpError from '../errors/HttpError';

class BaseController implements IController {
    public service: IService | any;
    public router: Router;

    constructor(service: IService) {
        this.service = service;
        this.router = Router();
    }

    public async registerElement(req: express.Request, res: express.Response): Promise<IUser | any> {
        const service = this.service;
        const data = req.body;

        return await (service && service.registerElement(data));
    }

    public async getElement(req: express.Request, res: express.Response): Promise<express.Response> {
        return res.send('ooooooss');
    }

    public async updateElement(req: express.Request, res: express.Response): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async deleteElement(req: express.Request, res: express.Response): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export default BaseController;
