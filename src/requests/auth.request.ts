import { check } from 'express-validator';
import { authMiddleware, showApiError } from '../middleware/auth.middleware';
import { Passport } from '../passport';
import { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/auth.service';

// Generate token
export const signUpRequest = [
    check('name')
        .exists().withMessage('使用者名稱不得為空')
    ,
    check('email')
        .exists().withMessage('Email 不得為空')
        .isEmail().withMessage('Email 格式錯誤')
    ,
    // 驗證密碼欄位
    check('password')
        .exists().withMessage('密碼不得為空')
        .isLength({ min: 8 }).withMessage('密碼少於8個字')
    ,
    // 驗證確認密碼欄位
    check('repassword')
        .exists().withMessage('請再次輸入密碼確認')
        .custom((value: any, { req }: any) => {
            if (value !== req.body.password) {
                throw new Error('確認密碼輸入不正確')
            }
            return true
        }),
    showApiError
];

export const googleRequest = [
    check('access_token').exists().withMessage('請輸入access_token'),
    showApiError,
    (req: Request, res: Response, next: NextFunction) => {
        Passport.authenticate('googleToken', { session: false }, function (err, user, info) {
            if (err) {
                console.error('err=>', err);
                return res.send({ error: err.name });
            }
            if (!user) {
                return res.send({ error: 'authentication failed' });
            }

            // success
            console.log('user=> ', user);
            const token = AuthService.signToken(user, 'google');
            return res.json({ 'token': token });

        })(req, res, next);
    },
];

export const facebookRequest = [
    (req: Request, res: Response, next: NextFunction) => {
        Passport.authenticate('facebookToken', { session: false }, function (err, user, info) {
            if (err) {
                console.error('err=>', err);
                return res.send({ error: err.name });
            }

            if (!user) {
                return res.send({ error: 'authentication failed' });
            }

            // success
            console.log('user=> ', user);
            const token = AuthService.signToken(user, 'facebook');
            return res.json({ 'token': token });

        })(req, res, next);
    },
];