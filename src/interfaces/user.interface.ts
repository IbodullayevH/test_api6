import { UserRole } from "src/entities/user-role.enum";

export interface IUser {
    id: number;
    login: string;
    password: string;
    address: string;
    role: UserRole;
}
