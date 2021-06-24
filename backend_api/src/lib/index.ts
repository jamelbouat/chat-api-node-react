import 'dotenv/config';
import App from './app';
import { container, setupDIContainer } from '../config/di.config';
import DBClient from '../config/db.config';
import { IController } from './interfaces/controller';

setupDIContainer();

// Database instance
const dbClient: DBClient = container.resolve('dbClient');

// Controllers instances
const userController: IController = container.resolve('userController');
const userTokenController: IController = container.resolve('UserTokenController');

// Entry point of the application
const server = new App(dbClient, [userController, userTokenController]);

server.listen();
