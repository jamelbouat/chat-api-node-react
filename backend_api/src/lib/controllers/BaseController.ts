import { Request, Response, NextFunction, Router } from 'express';

import Constants from '../../constants/constants';
import { IController } from '../interfaces/controller';
import { IUserService } from '../interfaces/service';

class BaseController implements IController {
    public service: IUserService | any;
    public router: Router;

    constructor(service: IUserService) {
        this.service = service;
        this.router = Router();
    }

    public async registerElement(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const reqData = req.body;
            await this.service.registerElement(reqData);
            res.status(201).json( { message: Constants.CREATION_SUCCESS });
        } catch (error) {
            next(error);
        }
    }

    public async getElement(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req.params.id;
            const element = await this.service.getElement(_id);
            res.status(200).json( { ...element });
        } catch (error) {
            next(error);
        }
    }

    public async updateElement(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req.user._id;
            const reqData = req.body;
            const element = await this.service.updateElement(_id, reqData);
            res.status(200).json( { ...element });
        } catch (error) {
            next(error);
        }
    }

    public async deleteElement(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req.params.id;
            await this.service.deleteElement(_id);
            res.status(200).json( { message: Constants.DELETION_SUCCESS });
        } catch (error) {
            next(error);
        }
    }

    public async getAllElements(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const elements = await this.service.getAllElements();
            res.status(200).json(elements);
        } catch(error) {
            next(error);
        }
    }
}

export default BaseController;
