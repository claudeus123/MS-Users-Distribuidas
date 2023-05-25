import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: false})
    password: string;
    
    @Column({nullable: false, unique: true})
    email: string;
    
    @Column()
    city: string;
    
    @Column()
    role: string;
    
    @Column({default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
    
    validatePassword(password: string): boolean{
        return this.password === password;
    }

    getInfoToToken() {
        return {
            id: this.id,
            mail: this.email,
            city: this.city,
        }
    }
}
