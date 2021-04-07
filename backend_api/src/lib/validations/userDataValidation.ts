import Joi from 'joi';
import IUser from '../interfaces/IUser';

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
});

const userRegisterDataValidation = (data: IUser): any => {
    return registerSchema.validate(data);
};

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

const userLoginDataValidation = (data: IUser): any => {
    return loginSchema.validate(data);
};

export { userRegisterDataValidation, userLoginDataValidation };
