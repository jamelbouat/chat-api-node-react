import Joi, { ValidationResult } from 'joi';

import { IMessageRegisterData, IMessageUpdateData } from '../interfaces/message';

const messageRegisterSchema = Joi.object({
    conversationId: Joi.string()
        .alphanum()
        .required(),

    from: Joi.string()
        .alphanum()
        .required(),

    content: Joi.string()
        .required()
});

const messageUpdateSchema = Joi.object({
    read: Joi.bool()
        .required(),
});

const messageRegisterDataValidation = (data: IMessageRegisterData): ValidationResult => {
    return messageRegisterSchema.validate(data);
};

const messageUpdateDataValidation = (data: IMessageUpdateData): ValidationResult => {
    return messageUpdateSchema.validate(data);
};

export {
    messageRegisterDataValidation,
    messageUpdateDataValidation
};
