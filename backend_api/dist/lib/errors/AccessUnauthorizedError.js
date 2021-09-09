"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("./commons/HttpError"));
class AccessUnauthorizedError extends HttpError_1.default {
    constructor() {
        super('Access unauthorized');
        this.status = 401;
    }
}
exports.default = AccessUnauthorizedError;
