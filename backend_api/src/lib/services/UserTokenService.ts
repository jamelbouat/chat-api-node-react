import jwt from 'jsonwebtoken';

import IUser from '../interfaces/IUser';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

class UserTokenService {
    private userModel: any;

    constructor({ userModel }: { userModel: any }) {
        this.userModel = userModel;
    }

    public async getNewUserTokens(user: IUser, refreshToken: string): Promise<any> {

        const userWithoutSensitiveData = this.removeSensitiveDataFromUser(user);
        const newAccessToken = this.generateAccessToken(userWithoutSensitiveData);
        const newRefreshToken = await this.updateCurrentRefreshToken(user, userWithoutSensitiveData, refreshToken);
        return { newAccessToken, newRefreshToken };
    }

    private removeSensitiveDataFromUser(user: IUser) {
        const configurableUser = user.toObject();
        delete configurableUser.password;
        delete configurableUser.__v;
        delete configurableUser.refreshTokens;
        return configurableUser;
    }

    private generateAccessToken(userWithoutSensitiveData: any): string {
        return this.getNewJwtToken(userWithoutSensitiveData, accessTokenSecret, '600s');
    }

    private async generateRefreshToken(user: IUser, userWithoutSensitiveData: any): Promise<string> {
        const refreshToken = this.getNewJwtToken(userWithoutSensitiveData, refreshTokenSecret, '6000s');
        let userRefreshTokens = user.refreshTokens || [];

        if(userRefreshTokens.length >= 5) {
            userRefreshTokens = [];
        }

        userRefreshTokens.push(refreshToken);
        await this.updateUser(user._id, userRefreshTokens);

        return refreshToken;
    }

    private async updateCurrentRefreshToken(user: IUser, userWithoutSensitiveData: any, oldToken: string): Promise<string> {
        const newRefreshToken = this.getNewJwtToken(userWithoutSensitiveData, refreshTokenSecret, '6000s');
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
