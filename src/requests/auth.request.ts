import { check } from 'express-validator';
import { authMiddleware, showApiError } from '../middleware/auth.middleware';
import { Passport } from '../passport';

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
    // authMiddleware,
    Passport.authenticate('googleToken', { session: false }),
];