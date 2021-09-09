"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const di_config_1 = require("../config/di.config");
const constants_1 = __importDefault(require("./constants/constants"));
const socket_1 = __importDefault(require("./socket"));
di_config_1.setupDIContainer();
// Database instance
const dbClient = di_config_1.container.resolve('dbClient');
// Controllers instances
const userController = di_config_1.container.resolve('userController');
const userTokenController = di_config_1.container.resolve('userTokenController');
const conversationController = di_config_1.container.resolve('conversationController');
// Entry point of the application
const application = new app_1.default(dbClient, [userController, userTokenController, conversationController]);
// Socket initialization
const httpServer = http_1.createServer(application.getApp());
global.io = new socket_io_1.Server(httpServer);
socket_1.default();
httpServer.listen(process.env.PORT, () => {
    console.log(constants_1.default.SERVER_RUNNING);
});
