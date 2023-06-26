import { Body, Controller, Post } from '@nestjs/common';
import { ForgotService } from './forgot.service';
import { ForgotUserDto } from './dto/forgot-user.dto';

@Controller('forgot')
export class ForgotController {
  constructor(private readonly forgotService: ForgotService) {}

  @Post()
  async renewPassword(@Body() forgotDto: ForgotUserDto): Promise<void> {
    // console.log(forgotDto);
    return await this.forgotService.sendMail(forgotDto);
  }
  

}
