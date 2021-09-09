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
const constants_1 = __importDefault(require("../constants/constants"));
class BaseController {
    constructor(service) {
        this.router = express_1.Router();
        this.service = service;
    }
    registerElement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqData = req.body;
                const element = yield this.service.registerElement(reqData);
                const returnBody = element ? element : { message: constants_1.default.CREATION_SUCCESS };
                res.status(201).json(returnBody);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getElement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const element = yield this.service.getElement(_id);
                res.status(200).json(Object.assign({}, element));
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateElement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const reqData = req.body;
                const element = yield this.service.updateElement(_id, reqData);
                res.status(200).json(Object.assign({}, element));
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteElement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                yield this.service.deleteElement(_id);
                res.status(200).json({ message: constants_1.default.DELETION_SUCCESS });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllElements(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUserId = req.user._id;
                const elements = yield this.service.getAllElements(currentUserId);
                res.status(200).json(elements);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = BaseController;
