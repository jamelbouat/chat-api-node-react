"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newConnection = void 0;
const token_1 = require("../utils/token");
const usersSockets_1 = require("./usersSockets");
const AccessTokenMissingError_1 = __importDefault(require("../errors/AccessTokenMissingError"));
const AccessUnauthorizedError_1 = __importDefault(require("../errors/AccessUnauthorizedError"));
const newConnection = (socket) => {
    const accessToken = socket.handshake.query.token;
    if (!accessToken) {
        throw new AccessTokenMissingError_1.default();
    }
    const verifiedConnectedUser = token_1.verifyAccessTokenValidation(accessToken);
    if (!verifiedConnectedUser) {
        throw new AccessUnauthorizedError_1.default;
    }
    const userId = verifiedConnectedUser.user._id;
    usersSockets_1.addToSocketUsersList(userId, socket);
};
exports.newConnection = newConnection;
