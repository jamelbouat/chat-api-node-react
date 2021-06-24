import { IUser, IUserLoginData, IUserRegisterData, IUserUpdateData, IUserWithoutSensitiveData } from './user';
import HttpError from '../errors/commons/HttpError';

export type IRequestDataType = IUserRegisterData | IUserUpdateData;
export type IResponseDataType = IUser;

interface IService {
    model: IUser | any;
    registerBaseElement: (reqData: IRequestDataType) => Promise<void | HttpError>;
    getBaseElementById: (_id: string) => Promise<IResponseDataType | HttpError>;
    getBaseElementByEmail: (email: string) => Promise<IResponseDataType | HttpError>;
    updateBaseElement: (_id: string, reqData: IRequestDataType) => Promise<IResponseDataType | HttpError>;
    deleteBaseElement: (_id: string) => Promise<void | HttpError>;
    getAllBaseElements: () => Promise<IResponseDataType[] | HttpError>;
}

interface IUserService extends IService {
    registerElement: (reqData: IUserRegisterData) => Promise<void | HttpError>;
    getElement: (_id: string) => Promise<IUserWithoutSensitiveData | HttpError>;
    getElementWithSensitiveData: (_id: string) => Promise<IUser | HttpError>;
    updateElement: (_id: string, reqData: IUserUpdateData) => Promise<IUserWithoutSensitiveData | HttpError>;
    deleteElement: (_id: string) => Promise<void | HttpError>;
    getAllElements: () => Promise<IResponseDataType[] | HttpError>;
    loginUser: (reqData: IUserLoginData) => Promise<IUser | HttpError>;
    logoutUser: (user: IUser, refreshToken: string) => Promise<void>;
}

export { IUserService, IService };
