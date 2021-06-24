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
import ObjectNotLoggedError from '../errors/ObjectNotLoggedError';
import HttpError from '../errors/commons/HttpError';
import ResourceNotUpdatedError from '../errors/ResourceNotUpdatedError';
import ObjectNotRegisteredError from '../errors/ObjectNotRegisteredError';
import {
    userLoginDataValidation,
    userRegisterDataValidation,
    userUpdateDataValidation
} from '../validations/userDataValidation';
import { generateAccessAndRefreshTokens, removeSensitiveDataFromUser } from '../../utils/token';

class UserService extends BaseService {

    constructor({ userModel }: { userModel: Model<IUser>}) {
        super();
        super.model = userModel;
    }

    public async registerElement(reqData: IUserRegisterData): Promise<HttpError | void> {
        const user = await super.getBaseElementByEmail(reqData.email);
        if (user) {
            throw new ObjectNotRegisteredError(`Email ${ reqData.email } already exists`);
        }

        const { error } = userRegisterDataValidation(reqData);
        if (error) {
            throw new ObjectNotRegisteredError(error.details[0].message);
        }

        const salt = await bcrypt.genSalt();
        reqData.password = await bcrypt.hash(reqData.password, salt);
        await super.registerBaseElement(reqData);
    }

    public async getElement(_id: string): Promise<IUserWithoutSensitiveData | HttpError> {
        const user = await super.getBaseElementById(_id) as IUser;
        if (!user) {
            throw new ResourceNotUpdatedError('User does not exist');
        }
        const userWithoutSensitiveData = removeSensitiveDataFromUser(user) ;
        return { ...userWithoutSensitiveData };
    }

    public async getElementWithSensitiveData(_id: string): Promise<IUser | HttpError> {
        return await super.getBaseElementById(_id);
    }

    public async updateElement(_id: string, reqData: IUserUpdateData): Promise<IUserWithoutSensitiveData | HttpError> {
        const user = await super.getBaseElementById(_id);
        if (!user) {
            throw new ResourceNotUpdatedError('User does not exist');
        }
        const { error } = userUpdateDataValidation(reqData);
        if (error) {
            throw new ResourceNotUpdatedError(error.details[0].message);
        }
        const updatedUser = await super.updateBaseElement(_id, reqData) as IUser;
        const userWithoutSensitiveData = removeSensitiveDataFromUser(updatedUser) ;
        return { ...userWithoutSensitiveData };
    }

    public async deleteElement(_id: string): Promise<void | HttpError> {
        return await super.deleteBaseElement(_id);
    }

    public async getAllElements(): Promise<IUserWithoutSensitiveData[] | HttpError> {
        const users = await super.getAllBaseElements() as IUser[];
        if (!users) {
            throw new ResourceNotUpdatedError('Users list is empty');
        }
        return users.map((user: IUser) => removeSensitiveDataFromUser(user));
    }

    public async logoutUser(user: IUser, refreshToken: string): Promise<void> {
        const userRefreshTokens = user.refreshTokens || [];
        const updatedUserRefreshTokensArr = userRefreshTokens.filter(token => token !== refreshToken);
        await super.updateBaseElement(user._id, { refreshTokens: updatedUserRefreshTokensArr });
    }

    public async loginUser(reqData: IUserLoginData): Promise<IUserLoginResponseData | HttpError> {
        const user = await super.getBaseElementByEmail(reqData.email) as IUser;
        if (!user) {
            throw new ObjectNotLoggedError(`Email ${ reqData.email } does not exist`);
        }

        const { error } = userLoginDataValidation(reqData);
        if (error) {
            throw new ObjectNotLoggedError(error.details[0].message);
        }

        const validPassword = await bcrypt.compare(reqData.password, user.password);
        if (!validPassword) {
            throw new ObjectNotLoggedError('wrong email or password');
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
        await super.updateBaseElement(user._id, { refreshTokens: userRefreshTokensArr });
    }
}

export default UserService;
