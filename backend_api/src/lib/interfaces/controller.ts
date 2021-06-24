import { NextFunction, Request, Response, Router } from 'express';
import { IService } from './service';

interface IController {
    service: IService;
    router: Router;
    registerElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

interface IUserController extends IController {
    loginUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logoutUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export { IController };
