import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
  type SwaggerDocumentOptions,
} from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
// import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());
  app.enableCors({
    // origin: 'http://localhost:3000',
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('KAZI')
    .setDescription('The Kazi API description')
    .setVersion('1.0')
    .addTag('Kazi')
    .addCookieAuth('refresh_token')
    .build();

  const options: SwaggerDocumentOptions = {
    autoTagControllers: true,
    operationIdFactory: (_controllerkey: string, methodKey: string) =>
      methodKey,
  };

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig, options);
  SwaggerModule.setup('api/v1', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
      withCredentials: true,
    },
    jsonDocumentUrl: 'docs-json',
  });

  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
