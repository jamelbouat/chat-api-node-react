import express, { Router } from 'express';
import { GET_NEW_USER_TOKEN_URL } from '../../config/url.config';

class AuthUserController {
    private tokenUserService: any;
    private router;

    constructor({ tokenUserService }: { tokenUserService: any }) {
        this.tokenUserService = tokenUserService;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(GET_NEW_USER_TOKEN_URL, this.getNewUserTokens);
    }

    private getNewUserTokens = async (req: express.Request, res: express.Response) => {
        try {
            const newTokens = await this.tokenUserService.refreshToken(req.body.refreshToken);
            res.status(200).json({ ...newTokens });
        } catch(err) {
            const status = err.status ? err.status : '401';
            res.status(status).json({ message: err.message });
        }
    }
}

export default AuthUserController;
