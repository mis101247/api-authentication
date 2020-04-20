import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import JWT from 'jsonwebtoken';

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

        const token = signToken(newUser);

        await newUser.save();
        return res.json({ 'token': token });

    }
}

export default AuthController;