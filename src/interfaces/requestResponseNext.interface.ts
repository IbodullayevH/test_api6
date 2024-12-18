import { Request, Response, NextFunction } from 'express';

export interface IRequestResponseNext {
    req: Request;
    res: Response;
    next: NextFunction;
}
