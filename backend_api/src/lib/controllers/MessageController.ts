import { NextFunction, Request, Response } from 'express';

import BaseController from './BaseController';
import { IMessageService } from '../interfaces/services';
import { ALL_MESSAGES_URL, DELETE_MESSAGE_URL } from '../../config/url.config';

class MessageController extends BaseController {
    private userAuthMiddleware: () => Promise<void>

    constructor({ messageService, userAuthMiddleware }:
                    {
                        messageService: IMessageService,
                        userAuthMiddleware: () => Promise<void>
                    }
    ) {
        super(messageService);
        this.userAuthMiddleware = userAuthMiddleware;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(ALL_MESSAGES_URL, this.userAuthMiddleware, this.getAllMessages);
        this.router.delete(DELETE_MESSAGE_URL, this.userAuthMiddleware, this.deleteMessage);
    }

    private deleteMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.deleteElement(req, res, next);
    }

    private getAllMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const conversationId = req.params.conversationId;
        try {
            const elements = await this.service.getAllElements(conversationId);
            res.status(200).json(elements);
        } catch(error) {
            next(error);
        }
    }

}

export default MessageController;
