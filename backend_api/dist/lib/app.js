"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = __importDefault(require("./constants/constants"));
const errorHandlerMiddleware_1 = __importDefault(require("./middlewares/errorHandlerMiddleware"));
class App {
    constructor(dbClient, controllers) {
        this.app = express_1.default();
        this.dbClient = dbClient;
        this.controllers = controllers;
        this.makeDatabaseConnection();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandlers();
    }
    makeDatabaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbClient.makeDatabaseConnection();
        });
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default());
    }
    initializeRoutes() {
        this.controllers.map(controller => {
            this.app.use('/', controller.router);
        });
    }
    initializeErrorHandlers() {
        this.app.use(errorHandlerMiddleware_1.default);
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(constants_1.default.SERVER_RUNNING);
        });
    }
    getApp() {
        return this.app;
    }
}
exports.default = App;
