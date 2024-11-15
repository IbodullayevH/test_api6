import { AppDataSource } from "config/typeorm.config";
import { User } from "entities";
import { ErrorHandler } from "errors";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";


function verifyRole(...roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(404).send({
                    success: false,
                    message: "🧐 Token not available 🤷‍♂️",
                });
            }

            let data: any = jwt.verify(token, process.env.JWT_SECRET as string)
            
            let { id } = data
            const user = await AppDataSource.getRepository(User).findOneBy({ id })

            if (roles.find(el => el == user?.role)) {
                next()
            } else {
                res.status(403).send({
                    success: false,
                    message: "You are not allowed ⚠️",
                })
            }

        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}

export default verifyRole