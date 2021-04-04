import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import DBClient from '../config/db.config';
import Constants from '../constants/constants';
import IController from './interfaces/IController';

class App {
    private app: express.Application;
    private dbClient: DBClient;
    private controllers: IController[];
    private notFoundController: any;

    constructor(dbClient: DBClient, controllers: IController[], notFoundController: any) {
        this.app = express();
        this.dbClient = dbClient;
        this.controllers = controllers;
        this.notFoundController = notFoundController;

        this.makeDatabaseConnection();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private async makeDatabaseConnection() {
        await this.dbClient.makeDatabaseConnection();
    }

    private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(express.json());
    }

    private initializeRoutes() {
        this.controllers.map(controller => {
            this.app.use('/', controller.router);
        });
        this.app.use(this.notFoundController);
    }

    public listen(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(Constants.SERVER_RUNNING);
        });
    }
}

export default App;
