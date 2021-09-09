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
const RefreshTokenMissingError_1 = __importDefault(require("../errors/RefreshTokenMissingError"));
const AccessForbiddenError_1 = __importDefault(require("../errors/AccessForbiddenError"));
const AccessUnauthorizedError_1 = __importDefault(require("../errors/AccessUnauthorizedError"));
const token_1 = require("../utils/token");
function IsUserRefreshTokenValid({ userService }) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const refreshToken = req.body.refreshToken;
        let verifiedRefreshToken;
        if (!refreshToken) {
            next(new RefreshTokenMissingError_1.default());
            return;
        }
        try {
            verifiedRefreshToken = token_1.verifyRefreshTokenValidation(refreshToken);
        }
        catch (error) {
            next(new AccessUnauthorizedError_1.default());
            return;
        }
        // Check if the refreshTokens array includes the received refresh token
        const user = yield userService.getElementWithSensitiveData(verifiedRefreshToken.user._id);
        if (!user || user.refreshTokens && !user.refreshTokens.includes(refreshToken)) {
            next(new AccessForbiddenError_1.default());
            return;
        }
        req.user = user;
        req.refreshToken = refreshToken;
        next();
    });
}
exports.default = IsUserRefreshTokenValid;
