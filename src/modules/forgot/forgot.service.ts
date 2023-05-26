import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';

import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { ForgotUserDto } from './dto/forgot-user.dto';

@Injectable()
export class ForgotService {

    constructor(private userService: UsersService){}

    async forgotPassword(forgotDto: ForgotUserDto){
        
        const user = await this.userService.findOne(forgotDto.email);
        if(!user) return null;

        // console.log(user);
        const password = this.generateRandomPassword(10);
        // const encodedPassword = decryptedPassword;
        const inputData = { password: password};
        const updateDto = plainToClass(UpdateUserDto, inputData);
        await this.userService.update(forgotDto.email, updateDto);


        return [
            user,
            password
        ]
    }

    generateRandomPassword(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        const passwordArray = [];

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            passwordArray.push(characters[randomIndex]);
        }

        return passwordArray.join('');
    }
}
