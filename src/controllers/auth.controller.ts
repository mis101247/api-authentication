import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import JWT from 'jsonwebtoken';
import * as AuthService from '../services/auth.service';

const signToken = (user: any) => {
    return JWT.sign({
        iss: 'KeyoServer',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
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
        return await newUser.save().then(async() => {
            const token = signToken(newUser);
    
            // 我免費仔用這個sendGrid服務 不是即時的會排隊寄送信件 
            await AuthService.sendSignSuccess(email);
            await AuthService.sendCoupon(email);
    
            return res.json({ 'token': token });
        }).catch(() => {
            return res.status(403).json({ error: 'user save fail!' });
        });

    }
}

export default AuthController;