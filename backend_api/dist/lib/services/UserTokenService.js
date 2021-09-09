"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../utils/token");
class UserTokenService {
    constructor({ userService }) {
        this.userService = userService;
    }
    getNewUserTokens(user, oldRefreshToken) {
        const { accessToken, refreshToken } = token_1.generateAccessAndRefreshTokens(user);
        this.replaceOldRefreshToken(user, oldRefreshToken, refreshToken);
        return { accessToken, refreshToken };
    }
    replaceOldRefreshToken(user, oldRefreshToken, newRefreshToken) {
        const userRefreshTokens = user.refreshTokens || [];
        const updatedUserRefreshTokensArr = userRefreshTokens.map((token) => token === oldRefreshToken ? newRefreshToken : token);
        this.userService.updateElement(user._id, { refreshTokens: updatedUserRefreshTokensArr });
    }
}
exports.default = UserTokenService;
