import { NextFunction, Request, Response, Router } from 'express';
import { IConversationService, IUserService } from './services';

interface IController {
    router: Router;
}

interface IBaseController extends IController {
    service: IUserService | IConversationService;
    registerElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllElements: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export { IController, IBaseController };
