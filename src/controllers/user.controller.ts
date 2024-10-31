import { IUser } from './../interfaces/user.interface';
import { ErrorHandler } from "../errors";
import { IRequestResponseNext } from "../interfaces";
import userService from 'src/services/user.service';

export class UserController {

    // all users
    static async allUsersData({ req, res, next }: IRequestResponseNext) {
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
    static async newUser({ req, res, next }: IRequestResponseNext) {
        try {
            const userData: IUser = req.body
            const newUser = userService.createUser(userData)

            res.status(201).send({
                message: "New user Successfully created",
                data: newUser
            });
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status || 400));
        }
    }
}

