import { AppDataSource } from "src/config/typeorm.config";
import { User } from "src/entities";
import { IUser } from "src/interfaces";

class UserService {
    private userRepository = AppDataSource.getRepository(User)

    async createUser(userData: IUser): Promise<object> {
        const newUser = this.userRepository.create(userData)
        return await this.userRepository.save(newUser);
    }

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async getUserById(id: number) {
        return await this.userRepository.findOneBy({ id });
    }
}

export default new UserService()