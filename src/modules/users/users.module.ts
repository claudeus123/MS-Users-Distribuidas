import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInformation } from 'src/entities/user-information.entity';
import { UsersSessions } from 'src/entities/user-sessions';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,UserInformation, UsersSessions])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
