import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSessions } from 'src/entities/user-sessions';

@Module({
  imports: [TypeOrmModule.forFeature([UsersSessions])],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
