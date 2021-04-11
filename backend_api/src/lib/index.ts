import 'dotenv/config';
import App from './app';
import { container, setupDIContainer } from '../config/di.config';
import IController from './interfaces/IController';
import DBClient from '../config/db.config';

setupDIContainer();

// Database instance
const dbClient: DBClient = container.resolve('dbClient');

// Controllers instances
const userController: IController = container.resolve('userController');
const userTokenController: IController = container.resolve('UserTokenController');
const notFoundController: any = container.resolve('notFoundController');

// Entry point of the application
const server = new App(dbClient, [userController, userTokenController], notFoundController);

server.listen();
