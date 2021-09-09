import Joi, { ValidationResult } from 'joi';

import { IConversationRegisterData, IConversationUpdateData } from '../interfaces/conversation';

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

    messageIds: Joi.array()
        .default([])
        .items(Joi.string())
});

const conversationRegisterDataValidation = (data: IConversationRegisterData): ValidationResult => {
    return conversationRegisterSchema.validate(data);
};

const conversationUpdateDataValidation = (data: IConversationUpdateData): ValidationResult => {
    return conversationUpdateSchema.validate(data);
};

export {
    conversationRegisterDataValidation,
    conversationUpdateDataValidation
};
