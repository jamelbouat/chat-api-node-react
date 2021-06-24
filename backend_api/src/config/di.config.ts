import * as awilix from 'awilix';

import UserController from '../lib/controllers/UserController';
import UserModel from '../lib/models/UserModel';
import UserService from '../lib/services/UserService';
import DBClient from './db.config';
import UserAuthMiddleware from '../lib/middlewares/userAuthMiddleware';
import UserTokenService from '../lib/services/UserTokenService';
import UserTokenController from '../lib/controllers/UserTokenController';
import IsUserRefreshTokenValid from '../lib/middlewares/isUserRefreshTokenValid';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

const setupDIContainer = (): void => {
    container.register({
        // Controllers
        userController: awilix.asClass(UserController),
        UserTokenController: awilix.asClass(UserTokenController),

        // Database
        dbClient: awilix.asClass(DBClient),

        // Services
        userService: awilix.asClass(UserService),
        userTokenService: awilix.asClass(UserTokenService),

        // Models
        userModel: awilix.asValue(UserModel),

        // Middlewares
        userAuthMiddleware: awilix.asFunction(UserAuthMiddleware),
        isUserRefreshTokenValid: awilix.asFunction(IsUserRefreshTokenValid),
    });
};

export { container, setupDIContainer };


