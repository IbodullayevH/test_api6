import { ErrorHandler } from "../errors/";
import { AppDataSource } from "../config/typeorm.config";
import { User } from "../entities";
import { UserRole } from "../entities/user-role.enum";
import { IUser } from "../interfaces";
import * as bcrypt from "bcrypt"

class UserService {
    private userRepository = AppDataSource.getRepository(User)

    async createUser(userData: IUser) {

        const existUser = await this.userRepository.findOne({ where: { login: userData.login } })
        if (existUser) {
            throw new Error("User already exists");
        }

        const adminCount = await this.userRepository.count({ where: { role: userData.role } });
        if (adminCount >= 1 && userData.role === UserRole.ADMIN) {
            throw new Error("Only one admin");
        }

        const hashedPassword = await bcrypt.hash(`${userData.password}`, 10)
        userData.password = hashedPassword

        const newUser = this.userRepository.create(userData)
        const savedUser = await this.userRepository.save(newUser);
        const { password, ...result } = savedUser
        return result
    }

    async getAllUsers() {
        return await this.userRepository.find({
            select: {
                id: true,
                login: true,
                password: false,
                address: true,
                role: true
            }
        })
    }

    async getUserById(id: number) {
        return await this.userRepository.findOneBy({ id });
    }

    // update user
    async updateUser(id: number, userData: IUser) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new ErrorHandler('Nout found', 404)
        }

        if (userData.login) {
            const checkQuantity = await this.userRepository.findOne({ where: { login: userData.login } })
            if (checkQuantity) {
                throw new ErrorHandler(`The login ${userData.login} you entered to update is already taken`, 404);
            }
        }

        const { role, ...updateData } = userData;

        await this.userRepository.update(id, updateData)
        return await this.userRepository.findOneBy({ id })
    }


    async removeUser(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new ErrorHandler('Nout found', 404)
        }
        return await this.userRepository.remove(user)
    }
}

export default new UserService()