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
const BaseController_1 = __importDefault(require("./BaseController"));
const url_config_1 = require("../../config/url.config");
class UserController extends BaseController_1.default {
    constructor({ userService, userAuthMiddleware, isUserRefreshTokenValid }) {
        super(userService);
        this.registerUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.registerElement(req, res, next);
        });
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.getElement(req, res, next);
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.updateElement(req, res, next);
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.deleteElement(req, res, next);
        });
        this.getAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.getAllElements(req, res, next);
        });
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const reqData = req.body;
                const loggedUser = yield this.service.loginUser(reqData);
                res.status(200).json(Object.assign({}, loggedUser));
            }
            catch (error) {
                next(error);
            }
        });
        this.logoutUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const refreshToken = req.refreshToken;
                yield this.service.logoutUser(user, refreshToken);
                res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
        this.service = userService;
        this.userAuthMiddleware = userAuthMiddleware;
        this.isUserRefreshTokenValid = isUserRefreshTokenValid;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(url_config_1.POST_USER_URL, this.registerUser);
        this.router.get(url_config_1.GET_USER_URL, this.userAuthMiddleware, this.getUser);
        this.router.post(url_config_1.UPDATE_USER_URL, this.userAuthMiddleware, this.updateUser);
        this.router.delete(url_config_1.DELETE_USER_URL, this.userAuthMiddleware, this.deleteUser);
        this.router.get(url_config_1.ALL_USERS_URL, this.userAuthMiddleware, this.getAllUsers);
        this.router.post(url_config_1.LOGIN_USER_URL, this.loginUser);
        this.router.post(url_config_1.LOGOUT_USER_URL, this.logoutUser);
    }
}
exports.default = UserController;
