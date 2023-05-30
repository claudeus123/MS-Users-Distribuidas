import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInformation } from 'src/entities/user-information.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,UserInformation])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
