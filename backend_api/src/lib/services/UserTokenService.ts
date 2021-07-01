import { IUser } from '../interfaces/user';
import { ITokens } from '../interfaces/token';
import { generateAccessAndRefreshTokens } from '../../utils/token';
import { IUserService, IUserTokenService } from '../interfaces/service';

class UserTokenService implements IUserTokenService {
    private userService: IUserService;

    constructor({ userService }: { userService: IUserService }) {
        this.userService = userService;
    }

    public getNewUserTokens(user: IUser, oldRefreshToken: string): ITokens {
        const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user);
        this.replaceOldRefreshToken(user, oldRefreshToken, refreshToken);
        return { accessToken, refreshToken };
    }

    private replaceOldRefreshToken(user: IUser, oldRefreshToken: string, newRefreshToken: string): void {
        const userRefreshTokens = user.refreshTokens || [];
        const updatedUserRefreshTokensArr = userRefreshTokens.map((token: string) => token === oldRefreshToken ? newRefreshToken : token);
        this.userService.updateElement(user._id, { refreshTokens: updatedUserRefreshTokensArr });
    }
}

export default UserTokenService;
