//auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // ເຮົາໃຊ້ Entity ແທນ Repository
import { CommonModule } from 'src/common/common.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule], // ເຮົາໃຊ້ Entity ແທນ Repository
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
