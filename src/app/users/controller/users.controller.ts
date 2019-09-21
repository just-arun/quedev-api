import { Request, Response, NextFunction } from 'express';
import UsersServices from '../services/users.services';
import HandleError from '../../../util/HandleError';

export default class UsersController {
    static async CreateOne(
        req: Request,
        res: Response,
        next: NextFunction
        ) {
        try {
            const data = await UsersServices.CreateOne(req.body)
            res.status(200).json({data})
        } catch (error) {
            next(HandleError(500,error));
        }
    }
}

