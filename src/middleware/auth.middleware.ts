import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.header('Authorization')) {
        return res.status(401).send({ error: 'unauthorized' });
    }

    next();
}

export function showApiError(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    next();
}