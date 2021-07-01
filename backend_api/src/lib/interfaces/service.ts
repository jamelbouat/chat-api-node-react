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

export type IRequestDataType = IUserRegisterData | IUserUpdateData;
export type IResponseDataType = IUser | null;

interface IBaseService {
    model: IUser | any;
    registerBaseElement: (reqData: IRequestDataType) => Promise<void | HttpError>;
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

interface IUserTokenService {
    getNewUserTokens: (user: IUser, oldRefreshToken: string) => ITokens
}

export { IBaseService, IUserService, IUserTokenService };
