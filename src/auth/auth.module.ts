import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // ເຮົາໃຊ້ Entity ແທນ Repository

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ເຮົາໃຊ້ Entity ແທນ Repository
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
