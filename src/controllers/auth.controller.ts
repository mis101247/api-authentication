import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import * as AuthService from '../services/auth.service';

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
            const token = AuthService.signToken(newUser, 'email');

            // 免費仔用sendGrid服務 會排隊寄送信件可能不會馬上就收到
            await AuthService.sendSignSuccess(email);
            await AuthService.sendCoupon(email);

            return res.json({ 'token': token });
        }).catch(() => {
            return res.status(403).json({ error: 'user save fail!' });
        });

    }
}
export default AuthController;