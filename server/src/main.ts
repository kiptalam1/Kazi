import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, type SwaggerDocumentOptions } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('KAZI')
    .setDescription('The Kazi API description')
    .setVersion('1.0')
    .addTag('Kazi')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    autoTagControllers: true,
    operationIdFactory: (_controllerkey: string,
      methodKey: string) => methodKey
  };

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig, options);
  SwaggerModule.setup('api/v1', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
