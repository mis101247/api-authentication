// src/routes/auth.route.ts

import Route from './route';
import AuthController from '../controllers/auth.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { signUpRequest } from '../requests/auth.request';

class AuthRoute extends Route {
    private authController = new AuthController();

    constructor() {
        super();
        this.prefix = '/auth';
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.post('/signup', signUpRequest , this.authController.signup);
    }
}

export default AuthRoute;