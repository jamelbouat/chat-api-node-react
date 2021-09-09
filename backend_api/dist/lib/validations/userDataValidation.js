"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateDataValidation = exports.userLoginDataValidation = exports.userRegisterDataValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const registerSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    firstName: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastName: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    refreshTokens: joi_1.default.array()
        .default([])
        .max(5),
});
const updateSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 }),
    password: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30),
    firstName: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30),
    lastName: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30),
    refreshTokens: joi_1.default.array()
        .default([])
        .max(5)
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
});
const userRegisterDataValidation = (data) => {
    return registerSchema.validate(data);
};
exports.userRegisterDataValidation = userRegisterDataValidation;
const userLoginDataValidation = (data) => {
    return loginSchema.validate(data);
};
exports.userLoginDataValidation = userLoginDataValidation;
const userUpdateDataValidation = (data) => {
    return updateSchema.validate(data);
};
exports.userUpdateDataValidation = userUpdateDataValidation;
