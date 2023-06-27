import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersSessions } from 'src/entities/user-sessions';
import { Repository } from 'typeorm';


@Injectable()
export class TokenService {
    constructor(@InjectRepository(UsersSessions) private sessionsRepository: Repository<UsersSessions>){}
    
    async findToken(token: string): Promise<UsersSessions> {
        const sessions = await this.sessionsRepository.find({
            where: {
                jwt: token,
                valid: true
            }
        })
        // console.log("a")
        // console.log(session);

        if (!sessions) return null;
        // console.log("ola?")
        return sessions[sessions.length - 1];
    }

    async closeSession(token: string): Promise<UsersSessions> {
        const session = await this.findToken(token);
        if (!session) return null;

        session.valid = false;
        return await this.sessionsRepository.save(session);

    }
}
