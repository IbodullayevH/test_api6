import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "errors";
import { AppDataSource } from "config/typeorm.config";
import { User } from "entities";



async function verificationToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(404).send({
                success: false,
                message: "🧐 Token not available 🤷‍♂️",
            });
        }

        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
        let { id } = decodedToken

        const user = await AppDataSource.getRepository(User).findOneBy({ id })

        if (user) {
            (req as any).user = user;
            next();
        } else {
            return res.status(404).send({
                success: false,
                message: "Not found user"
            })
        }


    } catch (error: any) {
        next(new ErrorHandler(error.message, error.status))
    }
}

export default verificationToken