import IUser from './IUser';
import IService from './IService';

interface IUserService extends IService {
    loginUser: (reqData: IUser) => Promise<IUser | any>;
    logoutUser: (user: IUser, refreshToken: string) => Promise<void>;
}

export default IUserService;
