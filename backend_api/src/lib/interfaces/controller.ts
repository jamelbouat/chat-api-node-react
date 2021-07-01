import { NextFunction, Request, Response, Router } from 'express';
import { IBaseService } from './service';

interface IController {
    router: Router;
}

interface IBaseController extends IController {
    service: IBaseService;
    registerElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteElement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllElements: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export { IController, IBaseController };
