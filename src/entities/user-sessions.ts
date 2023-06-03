import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({
    name: "users_sessions"
})
export class UsersSessions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    jwt: string;

    // @Column()
    // user_id: number;
    @Column()
    valid: boolean = true;

    @ManyToOne(() => User, user => user.sessions)
    user: User;
}
