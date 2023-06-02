import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from 'src/entities/user.entity';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersSessions } from 'src/entities/user-sessions';
import { UserSessionDto } from './dto/user-session.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UsersSessions) private userSessionsRepository: Repository<UsersSessions>,
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userLoginDto: UserLoginDto){
        const user = await this.userService.findOne(userLoginDto.email);
        if (!user) return null;
        if(!user.validatePassword(userLoginDto.password)) return null;

        const payload = user.getInfoToToken();
        const token = this.jwtService.sign(payload);


        const session = await this.addSession(user, token);
        return {
            token: token,
            user: user,
            session
        }
    }

    async addSession(user: User, token: string){
        const userSession: UserSessionDto = {
            jwt: token
        };

        const session = this.userSessionsRepository.create(userSession);
        session.user = user;
        return await this.userSessionsRepository.save(session);

    }

    async validate(payload: any){
        const { id } = payload;
        console.log(typeof(payload));// object
        const user = await this.userService.findUser(id);
        if (!user) throw new HttpException('Usuario no encontrado', 401)
        return user;
    }
}
