"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("./commons/HttpError"));
class ResourceNotUpdatedError extends HttpError_1.default {
    constructor(message) {
        super(message || 'Error: Cannot update the resource');
        this.status = 404;
    }
}
exports.default = ResourceNotUpdatedError;
