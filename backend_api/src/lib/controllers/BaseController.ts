import express, { Router } from 'express';
import IController from '../interfaces/IController';
import Constants from '../../constants/constants';
import IService from '../interfaces/IService';

class BaseController implements IController {
    public service: IService | any;
    public router: Router;

    constructor() {
        this.service = null;
        this.router = Router();
    }

    public async createElement(req: express.Request, res: express.Response): Promise<express.Response> {
        const Service = this.service;
        const data = req.body;
        try {
            await (Service && Service.createElement(data));
            return res.status(201).json({ message: Constants.USER_CREATION_SUCCESS });
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }

    public async getElement(req: express.Request, res: express.Response): Promise<express.Response> {
        return res.send('fff');
    }

    public async updateElement(req: express.Request, res: express.Response): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async deleteElement(req: express.Request, res: express.Response): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export default BaseController;
