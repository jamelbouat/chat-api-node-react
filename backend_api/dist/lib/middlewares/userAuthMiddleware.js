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
const AccessUnauthorizedError_1 = __importDefault(require("../errors/AccessUnauthorizedError"));
const AccessTokenMissingError_1 = __importDefault(require("../errors/AccessTokenMissingError"));
const token_1 = require("../utils/token");
function UserAuthMiddleware() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const authorization = req.headers.authorization;
        const accessToken = authorization && authorization.split(' ')[0] === 'Bearer' && authorization.split(' ')[1];
        let verifiedAccessToken;
        if (!accessToken) {
            next(new AccessTokenMissingError_1.default());
            return;
        }
        try {
            verifiedAccessToken = token_1.verifyAccessTokenValidation(accessToken);
        }
        catch (error) {
            next(new AccessUnauthorizedError_1.default());
            return;
        }
        req.user = verifiedAccessToken.user;
        next();
    });
}
exports.default = UserAuthMiddleware;
