import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.STAGE || 'dev'}`, // ສັງເກດຊື່ໄຟລ .env.dev ຕ້ອງໃສ່ໃຫ້ຕົງກັນນຳດ້ານໜ້າດ້ວຍ ຢ່າລຶມ
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const sslEnabled = configService.get<string>('SSL') === 'true';
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<number>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
          ssl: sslEnabled ? { rejectUnauthorized: false } : false,
        };
      },
    }),

    AuthModule,
  ],
})
export class AppModule {}
