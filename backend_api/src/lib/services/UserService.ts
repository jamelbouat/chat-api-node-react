import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import BaseService from './BaseService';
import IUser from '../interfaces/IUser';
import ObjectNotRegisteredError from '../errors/ObjectNotRegisteredError';
import { userLoginDataValidation, userRegisterDataValidation } from '../validations/userDataValidation';
import ObjectNotLoggedError from '../errors/ObjectNotLoggedError';
import IUserToken from '../interfaces/IUserToken';

class UserService extends BaseService {

    constructor({ userModel }: { userModel : IUser | any}) {
        super();
        this.model = userModel;
    }

    // add later try catch block, use object destructing in user controller, maybe omit salt
    public async registerElement(reqData: IUser): Promise<IUser | any> {
        const { error } = userRegisterDataValidation(reqData);
        if(error) throw new ObjectNotRegisteredError(error.details[0].message);

        const user = await this.isUserExists(reqData.email);
        if(user) throw new ObjectNotRegisteredError(`Email ${ reqData.email } already exists`);

        const salt = await bcrypt.genSalt();
        reqData.password = await bcrypt.hash(reqData.password, salt);

        return await super.registerElement(reqData);
    }

    public async loginUser(reqData: IUser): Promise<IUser | any> {
        const user = await this.isUserExists(reqData.email);
        if(!user) throw new ObjectNotLoggedError(`Email ${ reqData.email } does not exist`);

        const { error } = userLoginDataValidation(reqData);
        if(error) throw new ObjectNotLoggedError(error.details[0].message);

        const validPassword = await bcrypt.compare(reqData.password, user.password);
        if(!validPassword) throw new ObjectNotLoggedError('wrong email or password');

        const token = this.generateToken(user);
        return this.makeReturnedUser(user, token);
    }

    private makeReturnedUser(user: any, token: string) {
        const configurableUser = user.toObject();
        delete configurableUser.password;
        delete configurableUser.__v;
        return { user: configurableUser, token };
    }

    private async isUserExists(email: string) {
        return await this.model.findOne({ email });
    }

    private generateToken(user: IUser) {
        const expiresIn = 30 * 60;
        const secretToken = process.env.SECRET_TOKEN as string;
        return jwt.sign({ _id: user._id }, secretToken, { expiresIn });
    }
}

export default UserService;
