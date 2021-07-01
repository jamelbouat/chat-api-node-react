import Joi from 'joi';
import { IUserLoginData, IUserRegisterData, IUserUpdateData } from '../interfaces/user';

const registerSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),

    password: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    refreshTokens: Joi.array()
        .default([])
        .max(5),
});

const updateSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 }),

    password: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    refreshTokens: Joi.array()
        .default([])
        .max(5)
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),

    password: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
});

const userRegisterDataValidation = (data: IUserRegisterData): any => {
    return registerSchema.validate(data);
};

const userLoginDataValidation = (data: IUserLoginData): any => {
    return loginSchema.validate(data);
};

const userUpdateDataValidation = (data: IUserUpdateData): any => {
    return updateSchema.validate(data);
};

export { userRegisterDataValidation, userLoginDataValidation, userUpdateDataValidation };
