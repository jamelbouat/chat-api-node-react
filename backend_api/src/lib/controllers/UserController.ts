import express from 'express';
import BaseController from './BaseController';
import {
    ALL_USER_URL,
    DELETE_USER_URL,
    GET_USER_URL,
    LOGIN_USER_URL,
    POST_USER_URL,
    UPDATE_USER_URL
} from '../../config/url.config';
import Constants from '../../constants/constants';
import IUser from '../interfaces/IUser';
import IUserService from '../interfaces/IUserService';

class UserController extends BaseController {
    private userService: IUserService;
    private userAuthMiddleware: any;

    constructor({ userService, userAuthMiddleware }: { userService : IUserService, userAuthMiddleware: any }) {
        super(userService);
        this.userService = userService;
        this.userAuthMiddleware = userAuthMiddleware;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(POST_USER_URL, this.registerUser);
        this.router.get(GET_USER_URL, this.getUser);
        this.router.patch(UPDATE_USER_URL, this.updateUser);
        this.router.delete(DELETE_USER_URL, this.deleteUser);
        this.router.post(ALL_USER_URL, this.userAuthMiddleware, this.getAllUsers);
        this.router.post(LOGIN_USER_URL, this.loginUser);
    }

    private registerUser = async (req: express.Request, res: express.Response): Promise<IUser | any> => {
        try {
            const user = await this.registerElement(req, res);
            res.status(201).json( { id: user._id, message: Constants.USER_CREATION_SUCCESS });
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    private getUser = async (req: express.Request, res: express.Response) => {
        await this.getElement(req, res);
    }

    private updateUser = async (req: express.Request, res: express.Response) => {
        await this.updateElement(req, res);
    }

    private deleteUser = async (req: express.Request, res: express.Response) => {
        await this.deleteElement(req, res);
    }

    private getAllUsers = async (req: express.Request, res: express.Response) => {
        try {
            const user = req.user;
            res.send(user);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }



    private loginUser = async (req: express.Request, res: express.Response): Promise<IUser | any> => {
        const reqData = req.body;

        try {
            const loggedUser = await this.userService.loginUser(reqData);
            res.status(200).json( { ...loggedUser, message: Constants.USER_LOGGED_SUCCESS });
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }
}

export default UserController;
