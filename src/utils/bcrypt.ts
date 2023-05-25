import * as bcrypt from "bcrypt";

const SALT = 10; 
export function encodePassword(rawPassword: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePassword(password1: string, hash: string){
    return bcrypt.compareSync(password1, hash);
}