import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import JWT from 'jsonwebtoken';
import * as AuthService from '../services/auth.service';

const signToken = (user: any, method: 'email' | 'google' | 'facebook') => {
    const timeNow = Math.floor(new Date().getTime() / 1000);
    return JWT.sign({
        iss: 'KeyoServer',
        method: method,
        sub: user.id,
        iat: timeNow,
        exp: timeNow + (60 * 60 * 24 * 1),
    }, 'the_key');
}

class AuthController {
    async signup(req: Request, res: Response) {
        const { name, email } = req.body;

        const existsUser = await UserModel.findOne({ email });
        if (existsUser) {
            return res.status(403).json({ error: 'Email 已被註冊' });
        }

        console.log('name=>', name);
        console.log('email=>', email);
        const newUser = new UserModel({ name, email });

        return await newUser.save().then(async () => {
            const token = signToken(newUser, 'email');

            // 我免費仔用sendGrid服務 會排隊寄送信件可能不會馬上就收到
            await AuthService.sendSignSuccess(email);
            await AuthService.sendCoupon(email);

            return res.json({ 'token': token });
        }).catch(() => {
            return res.status(403).json({ error: 'user save fail!' });
        });

    }

    async google(req: Request, res: Response) {
        console.log('req.user=> ', req.user);
        const token = signToken(req.user, 'google');
        return res.json({ 'token': token });
    }

}
export default AuthController;