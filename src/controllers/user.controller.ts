import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors";
import { IUser } from "../interfaces";
import userService from "../services/user.service";

export class UserController {

    // all users
    static async allUsersData(req: Request, res: Response, next: NextFunction) {
        try {
            const allUsers = await userService.getAllUsers()

            res.status(200).send({
                message: "all users data",
                data: allUsers
            })

        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status || 400))
        }
    }

    // create new user
    static async newUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: IUser = req.body
            const newUser = await userService.createUser(userData)

            res.status(201).send({
                message: "New user successfully created",
                data: newUser
            });
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status || 400));
        }
    }

    // update users
    static async updateUserData(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: IUser = req.body
            const { id } = req.params
            const updatedUser = await userService.updateUser(+id, userData)

            res.status(200).send({
                message: "User data successfully updated",
                data: updatedUser
            });
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status || 400));
        }
    }


    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            await userService.removeUser(+id)

            res.status(200).send({
                message: "User successfully deleted"
            });
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status || 400));

        }
    }
}

