import { NextFunction } from 'express';
export default interface MiddleWareInterface {
    req: Request;
    res: Response;
    next: NextFunction;
}