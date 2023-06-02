import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { comparePassword } from "../utils/bcrypt";
import { UserInformation } from "./user-information.entity";
import { UsersSessions } from "./user-sessions";



@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: false})
    password: string;
    
    @Column({nullable: false, unique: true}) // Esto igual
    email: string;
    
    @Column()
    city: string;
    
    @Column()
    role: string = 'user';
    
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    // Arreglar esto
    created_at: Date;

    @OneToOne(() => UserInformation)
    @JoinColumn()
    userInformationId: UserInformation

    @OneToMany(() => UsersSessions, session => session.user)
    sessions: UsersSessions[]

    validatePassword(password: string): boolean{
        return comparePassword(password, this.password);
    }

    getInfoToToken() {
        return {
            id: this.id,
            city: this.city,
            role: this.role
        }
    }
}
