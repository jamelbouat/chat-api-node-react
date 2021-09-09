"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshTokenValidation = exports.verifyAccessTokenValidation = exports.generateAccessAndRefreshTokens = exports.removeSensitiveDataFromUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const objects_1 = require("./objects");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiresIn = 300000; // seconds
const refreshTokenExpiresIn = 600000; // seconds
const getNewJwtToken = (payload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign({ user: payload }, secret, { expiresIn });
};
const removeSensitiveDataFromUser = (user) => {
    const configurableUser = user.toObject();
    return objects_1.removePropertiesFromCurrentObject(configurableUser, 'password', '__v', 'refreshTokens');
};
exports.removeSensitiveDataFromUser = removeSensitiveDataFromUser;
const generateNewAccessToken = (userWithoutSensitiveData) => {
    const expiresAt = Date.now() + accessTokenExpiresIn * 1000; // expiresAt in ms
    const newAccessToken = getNewJwtToken(userWithoutSensitiveData, accessTokenSecret, accessTokenExpiresIn);
    return { token: newAccessToken, expiresAt };
};
const generateNewRefreshToken = (userWithoutSensitiveData) => {
    return getNewJwtToken(userWithoutSensitiveData, refreshTokenSecret, refreshTokenExpiresIn);
};
const generateAccessAndRefreshTokens = (user) => {
    const userWithoutSensitiveData = removeSensitiveDataFromUser(user);
    const accessToken = generateNewAccessToken(userWithoutSensitiveData);
    const refreshToken = generateNewRefreshToken(userWithoutSensitiveData);
    return { accessToken, refreshToken };
};
exports.generateAccessAndRefreshTokens = generateAccessAndRefreshTokens;
const verifyAccessTokenValidation = (accessToken) => {
    return jsonwebtoken_1.default.verify(accessToken, accessTokenSecret);
};
exports.verifyAccessTokenValidation = verifyAccessTokenValidation;
const verifyRefreshTokenValidation = (refreshToken) => {
    return jsonwebtoken_1.default.verify(refreshToken, refreshTokenSecret);
};
exports.verifyRefreshTokenValidation = verifyRefreshTokenValidation;
