import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';

import App from './app';
import { container, setupDIContainer } from '../config/di.config';
import DBClient from '../config/db.config';
import { IController } from './interfaces/controllers';
import Constants from './constants/constants';
import listenToSocketEvents from './socket';

setupDIContainer();

// Database instance
const dbClient: DBClient = container.resolve('dbClient');

// Controllers instances
const userController: IController = container.resolve('userController');
const userTokenController: IController = container.resolve('userTokenController');
const conversationController: IController = container.resolve('conversationController');

// Entry point of the application
const application = new App(dbClient, [userController, userTokenController, conversationController]);

// Socket initialization
const httpServer = createServer(application.getApp());
global.io = new Server(httpServer);
listenToSocketEvents();

httpServer.listen(process.env.PORT, () => {
    console.log(Constants.SERVER_RUNNING);
});
