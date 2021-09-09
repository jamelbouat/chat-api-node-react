import { Request, Response, NextFunction, Router } from 'express';

import Constants from '../constants/constants';
import { IBaseController } from '../interfaces/controllers';
import { IConversationService, IMessageService, IUserService } from '../interfaces/services';

class BaseController implements IBaseController {
    public router: Router;
    public service: IUserService | IConversationService | IMessageService;

    constructor(service: IUserService | IConversationService | IMessageService) {
        this.router = Router();
        this.service = service;
    }

    public async registerElement(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const reqData = req.body;
            const element = await this.service.registerElement(reqData);
            const returnBody = element ? element : { message: Constants.CREATION_SUCCESS };
            res.status(201).json(returnBody);
        } catch (error) {
            next(error);
        }
    }

    public async getElement(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req.params.id;
            const currentUserId = req.user._id;
            const element = await this.service.getElement(_id);
            res.status(200).json( { ...element });
        } catch (error) {
            next(error);
        }
    }

    public async updateElement(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req.params.id;
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
            const currentUserId = req.user._id;
            const elements = await this.service.getAllElements(currentUserId);
            res.status(200).json(elements);
        } catch(error) {
            next(error);
        }
    }
}

export default BaseController;
