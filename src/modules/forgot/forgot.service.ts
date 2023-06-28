import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';

import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { ForgotUserDto } from './dto/forgot-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ForgotService {

    constructor(private userService: UsersService, private readonly mailerService: MailerService){}

    async forgotPassword(forgotDto: ForgotUserDto): Promise<string>{
        
        const user = await this.userService.findOne(forgotDto.email);
        console.log(user)
        if(!user) throw new HttpException("User not found", 404);

        // console.log(user);
        const password = this.generateRandomPassword(20);
        // const encodedPassword = decryptedPassword;
        const inputData = { password: password};
        const updateDto = plainToClass(UpdateUserDto, inputData);
        await this.userService.changePassword(forgotDto.email, updateDto);


        return password
        
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


    async sendMail(forgotDto: ForgotUserDto): Promise<void> {
        const password = await this.forgotPassword(forgotDto);
        const email = forgotDto?.email
        // console.log('ola')
        this.mailerService.sendMail({
            to: email,
            from: 'claudiopizarro2010@gmail.com',
            subject: 'Reinicio de contraseña ✔', 
            
            html: 'La nueva contraseña es:' + '<b>' + password + '</b>',
        });
      }
}
