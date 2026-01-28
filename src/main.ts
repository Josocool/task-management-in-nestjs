import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

//console.log(process.env.MY_VARIABLE);
//console.log(process.env.SOMETHING);
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // ສ່ວນຂອງການໃຊ້ Validator ມາກວດສອບຄວາມຖືກຕ້ອງຂອງຂໍ້ມູນ
  app.useGlobalInterceptors(new TransformInterceptor()); // feature convert Serialize user data
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
