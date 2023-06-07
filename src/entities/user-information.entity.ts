import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({
    name: 'user_information'
})
export class UserInformation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    birthdate: Date;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({nullable: true})
    nickname: string;

    @Column({nullable: true})
    profile_image: string;
    
}