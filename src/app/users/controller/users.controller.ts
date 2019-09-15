import { Request, Response, NextFunction } from 'express';
import UsersServices from '../services/users.services';
import HandleError from '../../../util/HandleError';

export default class UsersController {
    static async CreateOne(req: Request, res: Response, next: NextFunction) {
        await UsersServices.CreateOne(req.body)
        .then((data) => res.status(200).json({data}))
        .catch((err) => HandleError(err));
    }
}

