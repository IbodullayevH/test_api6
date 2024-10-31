import { AppDataSource } from "src/config/typeorm.config";
import { User } from "src/entities";
import { ErrorHandler } from "src/errors";
import { IRequestResponseNext } from "src/interfaces";

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