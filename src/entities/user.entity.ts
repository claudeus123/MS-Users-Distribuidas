import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { comparePassword } from "../utils/bcrypt";
import { UserInformation } from "./user-information.entity";



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
    user_information: UserInformation

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
