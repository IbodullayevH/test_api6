import { AppDataSource } from "../config/typeorm.config";
import { User } from "../entities";
import { ErrorHandler } from "../errors";
import { IRequestResponseNext } from "../interfaces";


export class UserController {
    static async allUsersData({ req, res, next }: IRequestResponseNext) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const allUsers = await userRepository.find()

            res.status(200).send({
                message: "all users data",
                data: allUsers
            })

        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status || 400))
        }
    }


}