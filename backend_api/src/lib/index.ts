import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';

import App from './app';
import { container, setupDIContainer } from '../config/di.config';
import DBClient from '../config/db.config';
import { IController } from './interfaces/controllers';
import Constants from './constants/constants';
import listenToSocketEvents from './socket';
import { IConversationService, IMessageService } from './interfaces/services';

setupDIContainer();

// Database instance
const dbClient: DBClient = container.resolve('dbClient');

// Controllers instances
const userController: IController = container.resolve('userController');
const userTokenController: IController = container.resolve('userTokenController');
const conversationController: IController = container.resolve('conversationController');
const messageController: IController = container.resolve('messageController');
const conversationService: IConversationService = container.resolve('conversationService');
const messageService: IMessageService = container.resolve('messageService');

// Application entry point
const application = new App(dbClient, [
    userController,
    userTokenController,
    conversationController,
    messageController
]);

// Socket initialization
const httpServer = createServer(application.getApp());
global.io = new Server(httpServer, { cors: { origin: '*' } });
listenToSocketEvents(conversationService, messageService);

httpServer.listen(process.env.PORT, () => {
    console.log(Constants.SERVER_RUNNING);
});
