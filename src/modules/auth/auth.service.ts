import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userLoginDto: UserLoginDto){
        const user = await this.userService.findOne(userLoginDto.email);
        if (!user) return null;
        if(!user.validatePassword(userLoginDto.password)) return null;

        const payload = user.getInfoToToken();
        const token = this.jwtService.sign(payload);

        return {
            token: token,
            user: user
        }
    }
}
