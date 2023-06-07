import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ForgotModule } from './modules/forgot/forgot.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { TokenModule } from './modules/token/token.module';
import { JwtMiddleware } from './middlewares/jwt-middleware';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express/multer';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      ... DataSourceConfig
    }),
    MailerModule.forRoot({
      transport:{
        host: process.env.MAILER_MODULE_HOST,
        port: process.env.MAILER_MODULE_PORT,
        auth: {
          user: process.env.MAILER_MODULE_USER,
          pass: process.env.MAILER_MODULE_PASSWORD
        }
      }
    }),
    MulterModule.register({
      dest: './uploads',
      
    }),
    UsersModule,
    AuthModule,
    ForgotModule,
    TokenModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(JwtMiddleware)
      .forRoutes('users/profile')

      consumer
      .apply(JwtMiddleware)
      .forRoutes('users/upload')

      // consumer
      // .apply(JwtMiddleware)
      // .forRoutes('users/edit')
  }
}
