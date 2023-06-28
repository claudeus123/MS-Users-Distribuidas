import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { User } from "src/entities/user.entity";
import { UsersSessions } from "src/entities/user-sessions";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: {id:string}): Promise<User>{
        return await this.authService.validate(payload);
    }
}