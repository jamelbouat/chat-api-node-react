"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDIContainer = exports.container = void 0;
const awilix = __importStar(require("awilix"));
const UserController_1 = __importDefault(require("../lib/controllers/UserController"));
const UserModel_1 = __importDefault(require("../lib/models/UserModel"));
const UserService_1 = __importDefault(require("../lib/services/UserService"));
const db_config_1 = __importDefault(require("./db.config"));
const userAuthMiddleware_1 = __importDefault(require("../lib/middlewares/userAuthMiddleware"));
const UserTokenService_1 = __importDefault(require("../lib/services/UserTokenService"));
const UserTokenController_1 = __importDefault(require("../lib/controllers/UserTokenController"));
const isUserRefreshTokenValid_1 = __importDefault(require("../lib/middlewares/isUserRefreshTokenValid"));
const ConversationController_1 = __importDefault(require("../lib/controllers/ConversationController"));
const ConversationService_1 = __importDefault(require("../lib/services/ConversationService"));
const ConversationModel_1 = __importDefault(require("../lib/models/ConversationModel"));
const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});
exports.container = container;
const setupDIContainer = () => {
    container.register({
        // Controllers
        userController: awilix.asClass(UserController_1.default),
        userTokenController: awilix.asClass(UserTokenController_1.default),
        conversationController: awilix.asClass(ConversationController_1.default),
        // Database
        dbClient: awilix.asClass(db_config_1.default),
        // Services
        userService: awilix.asClass(UserService_1.default),
        userTokenService: awilix.asClass(UserTokenService_1.default),
        conversationService: awilix.asClass(ConversationService_1.default),
        // Models
        userModel: awilix.asValue(UserModel_1.default),
        conversationModel: awilix.asValue(ConversationModel_1.default),
        // Middlewares
        userAuthMiddleware: awilix.asFunction(userAuthMiddleware_1.default),
        isUserRefreshTokenValid: awilix.asFunction(isUserRefreshTokenValid_1.default),
    });
};
exports.setupDIContainer = setupDIContainer;
