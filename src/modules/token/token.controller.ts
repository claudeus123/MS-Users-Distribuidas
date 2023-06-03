import { Controller, Get, Body } from '@nestjs/common';
import { TokenService } from './token.service';
import { CloseSessionDto } from './dto/close-session.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  // @Get(':token')
  // async findToken(@Param('token') token: string){
  //   return await this.tokenService.findToken(token);
  // }

  @Get('close')
  async close(@Body('token') closeSessionDto :CloseSessionDto){
    return await this.tokenService.closeSession(closeSessionDto?.jwt);
  }
}
