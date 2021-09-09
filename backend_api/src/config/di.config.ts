import * as awilix from 'awilix';

import UserController from '../lib/controllers/UserController';
import UserModel from '../lib/models/UserModel';
import UserService from '../lib/services/UserService';
import DBClient from './db.config';
import UserAuthMiddleware from '../lib/middlewares/userAuthMiddleware';
import UserTokenService from '../lib/services/UserTokenService';
import UserTokenController from '../lib/controllers/UserTokenController';
import IsUserRefreshTokenValid from '../lib/middlewares/isUserRefreshTokenValid';
import ConversationController from '../lib/controllers/ConversationController';
import ConversationService from '../lib/services/ConversationService';
import ConversationModel from '../lib/models/ConversationModel';
import MessageService from '../lib/services/MessageService';
import MessageModel from '../lib/models/MessageModel';
import MessageController from '../lib/controllers/MessageController';
import { broadcastMessage } from '../lib/socket/broadcastMessage';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

const setupDIContainer = (): void => {
    container.register({
        // Controllers
        userController: awilix.asClass(UserController),
        userTokenController: awilix.asClass(UserTokenController),
        conversationController: awilix.asClass(ConversationController),
        messageController: awilix.asClass(MessageController),

        // Database
        dbClient: awilix.asClass(DBClient),

        // Services
        userService: awilix.asClass(UserService),
        userTokenService: awilix.asClass(UserTokenService),
        conversationService: awilix.asClass(ConversationService),
        messageService: awilix.asClass(MessageService),

        // Models
        userModel: awilix.asValue(UserModel),
        conversationModel: awilix.asValue(ConversationModel),
        messageModel: awilix.asValue(MessageModel),

        // Middlewares
        userAuthMiddleware: awilix.asFunction(UserAuthMiddleware),
        isUserRefreshTokenValid: awilix.asFunction(IsUserRefreshTokenValid),
    });
};

export { container, setupDIContainer };


