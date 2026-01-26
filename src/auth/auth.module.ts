//auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // ເຮົາໃຊ້ Entity ແທນ Repository
import { CommonModule } from 'src/common/common.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersRepository } from './users.repository';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([User]),
    CommonModule,
  ], //ເຮົາໃຊ້ Entity ແທນ Repository
  providers: [AuthService, JwtStrategy, UsersRepository],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, UsersRepository],
})
export class AuthModule {}
