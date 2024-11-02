import { UserRole } from "../entities/user-role.enum";

export interface IUser {
    id: number;
    login: string
    password: string;
    address: string;
    role?: UserRole;
}
