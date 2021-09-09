import { Model } from 'mongoose';

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
    IConversationUpdateData, IConversationWithUsersAndMessagesData
} from './conversation';
import { IMessage, IMessageData, IMessageRegisterData, IMessageUpdateData } from './message';

export type IRequestDataType = IUserRegisterData | IUserUpdateData |
    IConversationRegisterData | IConversationUpdateData | IMessageRegisterData;
export type IResponseDataType = IUser | IConversation | IConversationData | IMessageData | null;

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
    getAllElements: (_id: string) => Promise<IUserWithoutSensitiveData[] | HttpError>;
    logoutUser: (user: IUser, refreshToken: string) => Promise<void>;
    loginUser: (reqData: IUserLoginData) => Promise<IUserLoginResponseData | HttpError>;
}

interface IConversationService {
    registerElement: (reqData: IConversationRegisterData) => Promise<IConversationWithUsersAndMessagesData | HttpError>;
    getElement: (_id: string) => Promise<IConversationWithUsersAndMessagesData | HttpError>;
    updateElement: (_id: string, reqData: IConversationUpdateData) => Promise<IConversationData | HttpError>;
    deleteElement: (_id: string) => Promise<void | HttpError>;
    getAllElements: (_id: string) => Promise<IConversationWithUsersAndMessagesData[] | HttpError>;
    addNewUsers: (_id: string, userIds: string[]) => Promise<IConversationData | HttpError>;
    deleteUsers: (_id: string, userIds: string[]) => Promise<IConversationData | HttpError>;
    addNewMessages: (_id: string, messageIds: string[]) => Promise<IConversationData | HttpError>;
    deleteMessages: (_id: string, messageIds: string[]) => Promise<IConversationData | HttpError>;
}

interface IMessageService {
    registerElement: (reqData: IMessageRegisterData) => Promise<IMessageData | HttpError>;
    getElement: (_id: string) => Promise<IMessageData | HttpError>;
    updateElement: (_id: string, reqData: IMessageUpdateData) => Promise<IMessageData | HttpError>;
    deleteElement: (_id: string) => Promise<void | HttpError>;
    getAllElements: (conversationId: string) => Promise<IMessageData[] | HttpError>;
}

interface IUserTokenService {
    getNewUserTokens: (user: IUser, oldRefreshToken: string) => ITokens;
}

export {
    IBaseService,
    IUserService,
    IConversationService,
    IMessageService,
    IUserTokenService
};
