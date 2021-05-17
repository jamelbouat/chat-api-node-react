import jwt from 'jsonwebtoken';

import IUser from '../interfaces/IUser';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
const accessTokenExpiresIn = '600s';
const refreshTokenExpiresIn = '6000s';

class UserTokenService {
    private userModel: any;

    constructor({ userModel }: { userModel: any }) {
        this.userModel = userModel;
    }

    public async getNewUserTokens(user: IUser, refreshToken: string): Promise<any> {

        const userWithoutSensitiveData = this.removeSensitiveDataFromUser(user);
        const newAccessToken = this.generateAccessToken(userWithoutSensitiveData);
        const newRefreshToken = await this.updateCurrentRefreshToken(user, userWithoutSensitiveData, refreshToken);
        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    private removeSensitiveDataFromUser(user: IUser) {
        const configurableUser = user.toObject();
        delete configurableUser.password;
        delete configurableUser.__v;
        delete configurableUser.refreshTokens;
        return configurableUser;
    }

    private generateAccessToken(userWithoutSensitiveData: any): { token: string, expiresAt: string } {
        const expiresAt = Date.now() + accessTokenExpiresIn;
        const newAccessToken = this.getNewJwtToken(userWithoutSensitiveData, accessTokenSecret, accessTokenExpiresIn);
        return { token: newAccessToken, expiresAt };
    }

    private async generateRefreshToken(user: IUser, userWithoutSensitiveData: any): Promise<string> {
        const refreshToken = this.getNewJwtToken(userWithoutSensitiveData, refreshTokenSecret, refreshTokenExpiresIn);
        let userRefreshTokens = user.refreshTokens || [];

        if(userRefreshTokens.length >= 5) {
            userRefreshTokens = [];
        }

        userRefreshTokens.push(refreshToken);
        await this.updateUser(user._id, userRefreshTokens);

        return refreshToken;
    }

    private async updateCurrentRefreshToken(user: IUser, userWithoutSensitiveData: any, oldToken: string): Promise<string> {
        const newRefreshToken = this.getNewJwtToken(userWithoutSensitiveData, refreshTokenSecret, refreshTokenExpiresIn);
        const userRefreshTokens = user.refreshTokens || [];

        const updatedUserRefreshTokens = userRefreshTokens.map(token => {
            if(token === oldToken) {
                return newRefreshToken;
            }
            return token;
        });

        await this.updateUser(user._id, updatedUserRefreshTokens);
        return newRefreshToken;
    }

    private getNewJwtToken(payload: any, secret: string, expiresIn: string) {
        return jwt.sign({ user: payload }, secret, { expiresIn });
    }

    // move later to user services (update)
    private async updateUser(_id: string, refreshTokens: string[]) {
        await this.userModel.updateOne({ _id }, { refreshTokens });
    }
}

export default UserTokenService;
