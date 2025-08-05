import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from "express"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   const config = new DocumentBuilder()
    .setTitle('Exam example')
    .setDescription('The Exam API description')
    .setVersion('1.0')
    .addSecurityRequirements('bearer', ['bearer'])
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors()

    // app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
