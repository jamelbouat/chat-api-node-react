import bcrypt from 'bcrypt';

import BaseService from './BaseService';
import IUser from '../interfaces/IUser';
import ObjectNotRegisteredError from '../errors/ObjectNotRegisteredError';
import { userLoginDataValidation, userRegisterDataValidation } from '../validations/userDataValidation';
import ObjectNotLoggedError from '../errors/ObjectNotLoggedError';
import InternalServerError from '../errors/InternalServerError';

class UserService extends BaseService {
    private userTokenService: any;

    constructor({ userModel, userTokenService }: { userModel: any, userTokenService: any}) {
        super();
        this.model = userModel;
        this.userTokenService = userTokenService;
    }

    public async registerElement(reqData: IUser): Promise<IUser | any> {
        const { error } = userRegisterDataValidation(reqData);
        if(error) {
            throw new ObjectNotRegisteredError(error.details[0].message);
        }

        const user = await this.isUserExists(reqData.email);
        if(user) {
            throw new ObjectNotRegisteredError(`Email ${ reqData.email } already exists`);
        }

        const salt = await bcrypt.genSalt();
        reqData.password = await bcrypt.hash(reqData.password, salt);

        return await super.registerElement(reqData);
    }

    public async loginUser(reqData: IUser): Promise<IUser | any> {
        const user = await this.isUserExists(reqData.email);
        if(!user) {
            throw new ObjectNotLoggedError(`Email ${ reqData.email } does not exist`);
        }

        const { error } = userLoginDataValidation(reqData);
        if(error) {
            throw new ObjectNotLoggedError(error.details[0].message);
        }

        const validPassword = await bcrypt.compare(reqData.password, user.password);
        if(!validPassword) {
            throw new ObjectNotLoggedError('wrong email or password');
        }

        const userWithoutSensitiveData = this.userTokenService.removeSensitiveDataFromUser(user);
        const accessToken = this.userTokenService.generateAccessToken(userWithoutSensitiveData);
        const refreshToken = await this.userTokenService.generateRefreshToken(user, userWithoutSensitiveData);

        return { user: userWithoutSensitiveData, accessToken, refreshToken };
    }

    public async logoutUser(user: IUser, refreshToken: string): Promise<void> {
        const userRefreshTokens = user.refreshTokens || [];
        const updatedUserRefreshTokens = userRefreshTokens.filter(token => token !== refreshToken);

        // move later to user services (update)
        try {
            await this.model.updateOne({ _id: user._id }, { refreshTokens: updatedUserRefreshTokens });
        } catch (error) {
            throw new InternalServerError();
        }
    }

    private async isUserExists(email: string) {
        return await this.model.findOne({ email });
    }

}

export default UserService;
