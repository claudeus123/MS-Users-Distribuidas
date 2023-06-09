import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule} from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSessions } from 'src/entities/user-sessions';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '5y'}
    }),
    TypeOrmModule.forFeature([UsersSessions])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]

})
export class AuthModule {}
