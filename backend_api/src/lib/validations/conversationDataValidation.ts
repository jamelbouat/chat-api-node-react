import Joi, { ValidationResult } from 'joi';
import { IConversationRegisterData, IConversationUpdateData } from '../interfaces/conversation';

const messageSchema = Joi.object({
    from: Joi.string()
        .alphanum()
        .required(),

    content: Joi.string()
        .alphanum()
        .required(),

    time: Joi.string()
        .alphanum()
        .required(),

    read: Joi.bool()
        .required(),
});

const conversationRegisterSchema = Joi.object({
    userIds: Joi.array()
        .default([])
        .min(2)
        .required()
        .items(Joi.string()),
});

const conversationUpdateSchema = Joi.object({
    userIds: Joi.array()
        .min(2)
        .items(Joi.string()),

    messages: Joi.array()
        .items(messageSchema)
});

const conversationRegisterDataValidation = (data: IConversationRegisterData | IConversationUpdateData): ValidationResult => {
    return conversationRegisterSchema.validate(data);
};

const conversationUpdateDataValidation = (data: IConversationUpdateData): ValidationResult => {
    return conversationUpdateSchema.validate(data);
};

export {
    conversationRegisterDataValidation,
    conversationUpdateDataValidation
};
