import { NextFunction, Request, Response } from 'express';

import BaseController from './BaseController';
import {
    ALL_CONVERSATIONS_URL,
    DELETE_CONVERSATION_URL, DELETE_MESSAGE_FROM_CONVERSATION_URL,
    GET_CONVERSATION_URL,
    POST_CONVERSATION_URL,
    UPDATE_CONVERSATION_URL
} from '../../config/url.config';
import { IConversationService } from '../interfaces/services';

class ConversationController extends BaseController {
    public service: IConversationService;
    private userAuthMiddleware: () => Promise<void>;

    constructor({ conversationService, userAuthMiddleware }:
                    {
                        conversationService: IConversationService,
                        userAuthMiddleware: () => Promise<void>,
                    }
    ) {
        super(conversationService);
        this.service = conversationService;
        this.userAuthMiddleware = userAuthMiddleware;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(POST_CONVERSATION_URL, this.userAuthMiddleware, this.registerConversation);
        this.router.get(GET_CONVERSATION_URL, this.userAuthMiddleware, this.getConversation);
        this.router.post(UPDATE_CONVERSATION_URL, this.userAuthMiddleware, this.updateConversation);
        this.router.delete(DELETE_CONVERSATION_URL, this.userAuthMiddleware, this.deleteConversation);
        this.router.get(ALL_CONVERSATIONS_URL, this.userAuthMiddleware, this.getAllConversations);
        // this.router.delete(DELETE_MESSAGE_FROM_CONVERSATION_URL, this.userAuthMiddleware, this.deleteMessage);
    }

    private registerConversation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.registerElement(req, res, next);
    }

    private getConversation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.getElement(req, res, next);
    }

    private updateConversation = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        return undefined;
    }

    private deleteConversation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.deleteElement(req, res, next);
    }

    private getAllConversations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.getAllElements(req, res, next);
    }

    // private deleteMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         const _id = req.body.conversationId;
    //         const messageId = req.body.messageId;
    //
    //         const updatedConversation = await this.service.deleteMessage(_id, messageId);
    //         res.status(200).json( { ...updatedConversation });
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

export default ConversationController;
