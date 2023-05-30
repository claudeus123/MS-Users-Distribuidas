import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({
    name: 'user_information'
})
export class UserInformation {
    @OneToOne(() => User)
    @JoinColumn()
    @PrimaryColumn()
    user_id: number;

    @Column({nullable: true})
    birthdate: Date;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    
}