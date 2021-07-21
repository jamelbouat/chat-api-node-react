import { Document, Model } from 'mongoose';

import {
    IUser,
    IUserLoginData,
    IUserLoginResponseData,
    IUserRegisterData,
    IUserUpdateData,
    IUserWithoutSensitiveData
} from './user';
import HttpError from '../errors/commons/HttpError';
import { ITokens } from './token';
import {
    IConversation,
    IConversationData,
    IConversationRegisterData,
    IConversationUpdateData,
    IMessage
} from './conversation';

export type IRequestDataType = IUserRegisterData | IUserUpdateData | IConversationRegisterData | IConversationUpdateData;
export type IResponseDataType = IUser | IConversation | null;

interface IBaseService {
    model: Model<any>;
    registerBaseElement: (reqData: IRequestDataType) => Promise<IResponseDataType | void | HttpError>;
    getBaseElementById: (_id: string) => Promise<IResponseDataType | HttpError>;
    getBaseElementByEmail: (email: string) => Promise<IResponseDataType | HttpError>;
    updateBaseElement: (_id: string, reqData: IRequestDataType) => Promise<IResponseDataType | HttpError>;
    deleteBaseElement: (_id: string) => Promise<void | HttpError>;
    getAllBaseElements: () => Promise<IResponseDataType[] | HttpError>;
}

interface IUserService {
    registerElement: (reqData: IUserRegisterData) => Promise<void | HttpError>;
    getElement: (_id: string) => Promise<IUserWithoutSensitiveData | HttpError>;
    getElementWithSensitiveData: (_id: string) => Promise<IResponseDataType | HttpError>;
    updateElement: (_id: string, reqData: IUserUpdateData) => Promise<IUserWithoutSensitiveData | HttpError>;
    deleteElement: (_id: string) => Promise<void | HttpError>;
    getAllElements: () => Promise<IUserWithoutSensitiveData[] | HttpError>;
    logoutUser: (user: IUser, refreshToken: string) => Promise<void>;
    loginUser: (reqData: IUserLoginData) => Promise<IUserLoginResponseData | HttpError>;
}

interface IConversationService {
    registerElement: (reqData: IConversationRegisterData) => Promise<IConversationData | HttpError>;
    getElement: (_id: string) => Promise<IConversationData | HttpError>;
    updateElement: (_id: string, reqData: IConversationUpdateData) => Promise<IConversationData | HttpError>;
    deleteElement: (_id: string) => Promise<void | HttpError>;
    getAllElements: () => Promise<IConversationData[] | HttpError>;
    addNewMessage: (_id: string, message: IMessage) => Promise<IConversationData | HttpError>
    deleteMessage: (_id: string, messageId: string) => Promise<IConversationData | HttpError>
    addNewUsers: (_id: string, userId: string[]) => Promise<IConversationData | HttpError>
    deleteUsers: (_id: string, userId: string[]) => Promise<IConversationData | HttpError>
}

interface IUserTokenService {
    getNewUserTokens: (user: IUser, oldRefreshToken: string) => ITokens
}

export { IBaseService, IUserService, IConversationService, IUserTokenService };
