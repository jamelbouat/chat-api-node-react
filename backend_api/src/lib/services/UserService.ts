import express from 'express';
import BaseService from './BaseService';
import IUser from '../interfaces/IUser';
import UserNotCreatedError from '../errors/UserNotCreatedError';

class UserService extends BaseService {

    constructor({ userModel }: { userModel : IUser | any}) {
        super();
        super.model = userModel;
        this.objectNotCreatedError = new UserNotCreatedError();
    }

    public async createElement(reqData: IUser): Promise<express.Response> {
        return await super.createElement(reqData);
    }

}

export default UserService;
