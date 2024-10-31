import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-role.enum";

@Entity('Users')
export class User {

    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ unique: true, type: "text" })
    login: string;

    @Column({ nullable: false, type: "varchar", length: "80" })
    password: string;

    @Column({ nullable: false, type: "text" })
    address: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;
}
