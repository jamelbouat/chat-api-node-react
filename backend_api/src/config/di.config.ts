import * as awilix from 'awilix';
import UserController from '../lib/controllers/UserController';
import UserModel from '../lib/models/UserModel';
import UserService from '../lib/services/UserService';
import DBClient from './db.config';
import NotFoundController from '../lib/controllers/NotFoundController';

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

export const setupDIContainer = (): void => {
    container.register({
        userController: awilix.asClass(UserController),
        dbClient: awilix.asClass(DBClient),
        userService: awilix.asClass(UserService),
        userModel: awilix.asValue(UserModel),
        notFoundController: awilix.asFunction(NotFoundController)
    });
};


