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
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600, // ລະບຸເວລາວັນໝົດອາຍຸໃນການຈັດການ
          algorithm: 'HS256', // ລະບຸອໍກໍລິທີມ JWT ເປັນ HS256 ເພື່ອກວດສອບຄວາມຖືກຕ້ອງ ຂອງ auth
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
    CommonModule,
  ], //ເຮົາໃຊ້ Entity ແທນ Repository
  providers: [AuthService, JwtStrategy, UsersRepository],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, UsersRepository],
})
export class AuthModule {}
