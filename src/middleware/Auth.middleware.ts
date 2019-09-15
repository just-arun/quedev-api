import { Request, Response, NextFunction, response } from 'express';
import HandleError from '../util/HandleError';
interface MiddleParams {
    req: Request;
    res: Response;
    next: NextFunction;
}

export default class AuthendicationMiddleware {
    static async User(params: MiddleParams) {
        const { req, res, next } = params;
        try {
            const token = req.cookies;
            if (!token) {
                throw "no token found";
            } else {
                next();
            }
        } catch (error) {
            HandleError(error);
        }
    }
}