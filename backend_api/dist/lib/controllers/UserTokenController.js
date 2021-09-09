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
const express_1 = require("express");
const url_config_1 = require("../../config/url.config");
const AccessForbiddenError_1 = __importDefault(require("../errors/AccessForbiddenError"));
class UserTokenController {
    constructor({ userTokenService, isUserRefreshTokenValid }) {
        this.getNewUserTokens = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const oldRefreshToken = req.refreshToken;
                const newTokens = yield this.service.getNewUserTokens(user, oldRefreshToken);
                res.status(200).json(Object.assign({}, newTokens));
            }
            catch (err) {
                next(new AccessForbiddenError_1.default());
            }
        });
        this.router = express_1.Router();
        this.service = userTokenService;
        this.isUserRefreshTokenValid = isUserRefreshTokenValid;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(url_config_1.GET_NEW_USER_TOKEN_URL, this.isUserRefreshTokenValid, this.getNewUserTokens);
    }
}
exports.default = UserTokenController;
