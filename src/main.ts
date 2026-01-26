import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // ສ່ວນຂອງການໃຊ້ Validator ມາກວດສອບຄວາມຖືກຕ້ອງຂອງຂໍ້ມູນ
  app.useGlobalInterceptors(new TransformInterceptor()); // feature convert Serialize user data

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
