import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://127.0.0.1:4001',
      'http://127.0.0.1:4002',
      'http://127.0.0.1:4003',
      'http://127.0.0.1:4004',
      'http://127.0.0.1:4005'
    ],
    methods: ['GET', 'POST'],
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
