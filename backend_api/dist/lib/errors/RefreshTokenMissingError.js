"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("./commons/HttpError"));
class RefreshTokenMissingError extends HttpError_1.default {
    constructor() {
        super('Refresh token is missing');
        this.status = 403;
    }
}
exports.default = RefreshTokenMissingError;
