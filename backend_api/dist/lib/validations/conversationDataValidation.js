"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationUpdateDataValidation = exports.conversationRegisterDataValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const messageSchema = joi_1.default.object({
    from: joi_1.default.string()
        .alphanum()
        .required(),
    content: joi_1.default.string()
        .alphanum()
        .required(),
    time: joi_1.default.string()
        .alphanum()
        .required(),
    read: joi_1.default.bool()
        .required(),
});
const conversationUser = joi_1.default.object({
    userId: joi_1.default.string()
        .alphanum()
        .required(),
    firstName: joi_1.default.string()
        .alphanum()
        .required(),
    lastName: joi_1.default.string()
        .alphanum()
        .required(),
});
const conversationRegisterSchema = joi_1.default.object({
    userIds: joi_1.default.array()
        .default([])
        .min(2)
        .required()
        .items(joi_1.default.string()),
});
const conversationUpdateSchema = joi_1.default.object({
    users: joi_1.default.array()
        .min(2)
        .items(conversationUser),
    messages: joi_1.default.array()
        .items(messageSchema)
});
const conversationRegisterDataValidation = (data) => {
    return conversationRegisterSchema.validate(data);
};
exports.conversationRegisterDataValidation = conversationRegisterDataValidation;
const conversationUpdateDataValidation = (data) => {
    return conversationUpdateSchema.validate(data);
};
exports.conversationUpdateDataValidation = conversationUpdateDataValidation;
