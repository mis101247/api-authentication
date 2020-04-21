// src/routes/auth.route.ts
import Route from './route';
import AuthController from '../controllers/auth.controller';
import * as AuthRequest from '../requests/auth.request';

class AuthRoute extends Route {
    private authController = new AuthController();

    constructor() {
        super();
        this.prefix = '/auth';
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.post('/signup', AuthRequest.signUpRequest , this.authController.signup);
        this.router.post('/google', AuthRequest.googleRequest );
        this.router.post('/facebook', AuthRequest.facebookRequest );
    }

}

export default AuthRoute;