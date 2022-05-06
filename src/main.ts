import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './infrastructure/interceptors/exception.interceptor';
//different comment 1
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
//different comment 2
  const options = new DocumentBuilder().build();
//different comment 3
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ExceptionInterceptor());

  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
