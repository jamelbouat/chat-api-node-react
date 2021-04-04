import express from 'express';
import BaseController from './BaseController';
import { ALL_USER_URL, DELETE_USER_URL, GET_USER_URL, POST_USER_URL, UPDATE_USER_URL} from '../../config/url.config';
import IService from '../interfaces/IService';

class UserController extends BaseController {

    constructor({ userService }: { userService : IService }) {
        super();
        super.service = userService;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(POST_USER_URL, this.createUser);
        this.router.get(GET_USER_URL, this.getUser);
        this.router.patch(UPDATE_USER_URL, this.updateUser);
        this.router.delete(DELETE_USER_URL, this.deleteUser);
        this.router.get(ALL_USER_URL, this.getAllUsers);
    }

    private createUser = async (req: express.Request, res: express.Response) => {
        await this.createElement(req, res);
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
        return Promise.resolve(undefined);

    }
}

export default UserController;
