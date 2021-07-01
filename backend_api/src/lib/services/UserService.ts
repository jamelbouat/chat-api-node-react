import bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import {
    IUser,
    IUserLoginData,
    IUserLoginResponseData,
    IUserRegisterData,
    IUserUpdateData, IUserWithoutSensitiveData,
} from '../interfaces/user';
import BaseService from './BaseService';
import UserNotLoggedError from '../errors/UserNotLoggedError';
import HttpError from '../errors/commons/HttpError';
import ResourceNotUpdatedError from '../errors/ResourceNotUpdatedError';
import ResourceNotRegisteredError from '../errors/ResourceNotRegisteredError';
import {
    userLoginDataValidation,
    userRegisterDataValidation,
    userUpdateDataValidation
} from '../validations/userDataValidation';
import { generateAccessAndRefreshTokens, removeSensitiveDataFromUser } from '../../utils/token';
import { IResponseDataType, IUserService } from '../interfaces/service';
import ResourceNotFoundError from '../errors/ResourceNotFoundError';

class UserService extends BaseService implements IUserService {

    constructor({ userModel }: { userModel: Model<IUser>}) {
        super(userModel);
    }

    public async registerElement(reqData: IUserRegisterData): Promise<void | HttpError> {
        const user = await this.getBaseElementByEmail(reqData.email);
        if (user) {
            throw new ResourceNotRegisteredError(`Email ${ reqData.email } already exists`);
        }

        const { error } = userRegisterDataValidation(reqData);
        if (error) {
            throw new ResourceNotRegisteredError(error.details[0].message);
        }

        const salt = await bcrypt.genSalt();
        reqData.password = await bcrypt.hash(reqData.password, salt);
        await super.registerBaseElement(reqData);
    }

    public async getElement(_id: string): Promise<IUserWithoutSensitiveData | HttpError> {
        const user = await this.getBaseElementById(_id) as IUser;
        if (!user) {
            throw new ResourceNotFoundError('User does not exist');
        }
        const userWithoutSensitiveData = removeSensitiveDataFromUser(user) ;
        return { ...userWithoutSensitiveData };
    }

    public async getElementWithSensitiveData(_id: string): Promise<IResponseDataType | HttpError> {
        return await this.getBaseElementById(_id);
    }

    public async updateElement(_id: string, reqData: IUserUpdateData): Promise<IUserWithoutSensitiveData | HttpError> {
        const user = await this.getBaseElementById(_id);
        if (!user) {
            throw new ResourceNotUpdatedError('User does not exist');
        }
        const { error } = userUpdateDataValidation(reqData);
        if (error) {
            throw new ResourceNotUpdatedError(error.details[0].message);
        }
        const updatedUser = await this.updateBaseElement(_id, reqData) as IUser;
        const userWithoutSensitiveData = removeSensitiveDataFromUser(updatedUser) ;
        return { ...userWithoutSensitiveData };
    }

    public async deleteElement(_id: string): Promise<void | HttpError> {
        return await this.deleteBaseElement(_id);
    }

    public async getAllElements(): Promise<IUserWithoutSensitiveData[] | HttpError> {
        const users = await this.getAllBaseElements() as IUser[];
        if (!users) {
            throw new ResourceNotFoundError('Users list is empty');
        }
        return users.map((user: IUser) => removeSensitiveDataFromUser(user));
    }

    public async logoutUser(user: IUser, refreshToken: string): Promise<void> {
        const userRefreshTokens = user.refreshTokens || [];
        const updatedUserRefreshTokensArr = userRefreshTokens.filter(token => token !== refreshToken);
        await super.updateBaseElement(user._id, { refreshTokens: updatedUserRefreshTokensArr });
    }

    public async loginUser(reqData: IUserLoginData): Promise<IUserLoginResponseData | HttpError> {
        const user = await this.getBaseElementByEmail(reqData.email) as IUser;
        if (!user) {
            throw new UserNotLoggedError(`Email ${ reqData.email } does not exist`);
        }

        const { error } = userLoginDataValidation(reqData);
        if (error) {
            throw new UserNotLoggedError(error.details[0].message);
        }

        const validPassword = await bcrypt.compare(reqData.password, user.password);
        if (!validPassword) {
            throw new UserNotLoggedError('wrong email or password');
        }

        const userWithoutSensitiveData = removeSensitiveDataFromUser(user);
        const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user);
        await this.addRefreshTokenToRefreshTokensArray(user, refreshToken);
        return { user: userWithoutSensitiveData, accessToken, refreshToken };
    }

    private async addRefreshTokenToRefreshTokensArray(user: IUser, refreshToken: string): Promise<void> {
        let userRefreshTokensArr = user.refreshTokens || [];
        if (userRefreshTokensArr.length >= 5) {
            userRefreshTokensArr = [];
        }
        userRefreshTokensArr.push(refreshToken);
        await this.updateBaseElement(user._id, { refreshTokens: userRefreshTokensArr });
    }
}

export default UserService;
