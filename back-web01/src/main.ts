import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbService } from './services/db.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await DbService
  await app.listen(3000);
}
bootstrap();
