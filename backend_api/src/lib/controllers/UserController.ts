import { NextFunction, Request, Response } from 'express';

import BaseController from './BaseController';
import { IUserService } from '../interfaces/services';
import {
    ALL_USER_URL,
    DELETE_USER_URL,
    GET_USER_URL,
    LOGIN_USER_URL,
    LOGOUT_USER_URL,
    POST_USER_URL,
    UPDATE_USER_URL
} from '../../config/url.config';

class UserController extends BaseController {
    public service: IUserService;
    private userAuthMiddleware: () => Promise<void>;
    private isUserRefreshTokenValid: () => Promise<void>;

    constructor({ userService, userAuthMiddleware, isUserRefreshTokenValid }:
                    {
                        userService : IUserService,
                        userAuthMiddleware: () => Promise<void>,
                        isUserRefreshTokenValid : () => Promise<void>
                    })
    {
        super(userService);
        this.service = userService;
        this.userAuthMiddleware = userAuthMiddleware;
        this.isUserRefreshTokenValid = isUserRefreshTokenValid;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(POST_USER_URL, this.registerUser);
        this.router.get(GET_USER_URL, this.userAuthMiddleware, this.getUser);
        this.router.post(UPDATE_USER_URL, this.userAuthMiddleware, this.updateUser);
        this.router.delete(DELETE_USER_URL, this.userAuthMiddleware, this.deleteUser);
        this.router.get(ALL_USER_URL, this.userAuthMiddleware, this.getAllUsers);
        this.router.post(LOGIN_USER_URL, this.loginUser);
        this.router.post(LOGOUT_USER_URL, this.logoutUser);
    }

    private registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.registerElement(req, res, next);
    }

    private getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.getElement(req, res, next);
    }

    private updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.updateElement(req, res, next);
    }

    private deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.deleteElement(req, res, next);
    }

    private getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.getAllElements(req, res, next);
    }

    private loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const reqData = req.body;
            const loggedUser = await this.service.loginUser(reqData);
            res.status(200).json( { ...loggedUser });
        } catch (error) {
            next(error);
        }
    }

    private logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = req.user;
            const refreshToken = req.refreshToken;
            await this.service.logoutUser(user, refreshToken);
            res.status(204).json();
        } catch (error){
            next(error);
        }
    }
}

export default UserController;
