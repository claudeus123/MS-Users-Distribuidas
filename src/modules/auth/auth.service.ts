import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    async login(userLoginDto: UserLoginDto): Promise<{
        token: string;
        
    }>{
        const user = await this.userService.findOne(userLoginDto.email);
        if (!user) throw new HttpException("Usuario o contraseña incorrecta", 401);
        if(!user.validatePassword(userLoginDto.password)) throw new HttpException("Usuario o contraseña incorrecta", 401);

        const payload = user.getInfoToToken();
        const token = this.jwtService.sign(payload);


        const session = await this.addSession(user, token);
        return {
            token: token
        }
    }

    async addSession(user: User, token: string): Promise<UsersSessions>{
        const userSession: UserSessionDto = {
            jwt: token
        };

        const session = this.userSessionsRepository.create(userSession);
        session.user = user;
        return await this.userSessionsRepository.save(session);

    }

    async validate(payload: {id:string}): Promise<User>{
        const { id } = payload;
        console.log(typeof(payload));// object
        const user = await this.userService.findUser(+id);
        if (!user) throw new HttpException('Usuario no encontrado', 401)
        return user;
    }
}
