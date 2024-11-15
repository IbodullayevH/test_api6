import { AppDataSource } from "config/typeorm.config";
import { User } from "entities";
import { NextFunction, Request, Response } from "express";
import generateToken from "./generate.token";
import { ErrorHandler } from "errors";
import { IUser } from "interfaces";
import * as bcrypt from "bcrypt"


class LoginUser {
    static async getLogin(req: Request, res: Response, next: NextFunction): Promise<object> {
        try {
            let { login, password }: Partial<IUser> = req.body

            if (!req.body) {
                return res.status(404).send({
                    message: "The field cannot be freed"
                })
            }
            const user: any = await AppDataSource.getRepository(User).findOne({ where: { login } })

            if (!user) {
                return res.status(404).send({
                    message: "not found user"
                })
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);            
            if (!isPasswordCorrect) {
                return res.status(401).send({
                    message: "Incorrect password"
                });
            }

            const token: object = await generateToken({ id: user.id, login: user.login })
            res.status(200).send({
                tokens: token
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}

export default LoginUser