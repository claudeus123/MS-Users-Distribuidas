import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { TokenService } from "src/modules/token/token.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware{
    constructor(private jwtService: JwtService, private tokenService: TokenService){}
    async use(req: Request, res: Response, next: NextFunction) {
        try {   
            // console.log("Pase por el middleware");
            const token = req.headers.authorization;
            if (!token) throw new HttpException('Unauthorized access', 401);

            const jwt = token.split(' ')[1]
            const validationToken = await this.tokenService.findToken(jwt);
            // console.log("Aca no hay token")
            // console.log(validationToken)
            if (!validationToken) throw new HttpException('Invalid token', 401);
            next()
            
        } catch (err) {
            throw new HttpException(err.message, 401)
        }

    }
    
}