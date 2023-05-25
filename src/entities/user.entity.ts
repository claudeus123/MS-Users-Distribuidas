import { comparePassword } from "src/utils/bcrypt";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


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
    
    validatePassword(password: string): boolean{
        return comparePassword(password, this.password);
    }

    getInfoToToken() {
        return {
            id: this.id,
            mail: this.email,
            city: this.city,
        }
    }
}
