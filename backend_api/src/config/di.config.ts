import * as awilix from 'awilix';
import UserController from '../lib/controllers/UserController';
import UserModel from '../lib/models/UserModel';
import UserService from '../lib/services/UserService';
import DBClient from './db.config';
import NotFoundController from '../lib/controllers/NotFoundController';
import UserAuthMiddleware from '../lib/middlewares/userAuthMiddleware';

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

export const setupDIContainer = (): void => {
    container.register({
        // Controllers
        userController: awilix.asClass(UserController),
        notFoundController: awilix.asFunction(NotFoundController),

        // Database
        dbClient: awilix.asClass(DBClient),

        // Services
        userService: awilix.asClass(UserService),

        // Models
        userModel: awilix.asValue(UserModel),

        // Middlewares
        userAuthMiddleware: awilix.asFunction(UserAuthMiddleware),
    });
};


