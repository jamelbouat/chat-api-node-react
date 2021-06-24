import 'dotenv/config';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import DBClient from '../config/db.config';
import Constants from '../constants/constants';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import { IController } from './interfaces/controller';

class App {
    private app: Application;
    private dbClient: DBClient;
    private controllers: IController[];

    constructor(dbClient: DBClient, controllers: IController[]) {
        this.app = express();
        this.dbClient = dbClient;
        this.controllers = controllers;

        this.makeDatabaseConnection();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandlers();
    }

    private async makeDatabaseConnection() {
        await this.dbClient.makeDatabaseConnection();
    }

    private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(cors());
    }

    private initializeRoutes() {
        this.controllers.map(controller => {
            this.app.use('/', controller.router);
        });
    }

    private initializeErrorHandlers() {
        this.app.use(errorHandlerMiddleware);
    }

    public listen(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(Constants.SERVER_RUNNING);
        });
    }
}

export default App;
