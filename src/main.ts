import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as express from 'express';

const logger: Logger = new Logger('Main');
async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  // app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Antino Resume Builder')
    .setDescription('The swagger document for APIs')
    .setVersion('1.0.0.a')
    .build();

  app.use(express.static('src'));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  const PORT = parseInt(process.env.APP_PORT) || 5555;
  app.listen(PORT, () => {
    logger.log('---------------------------------');
    logger.log(`🚀 App is listening on ${PORT} 🚀`);
    logger.log('---------------------------------');
  });
}
bootstrap();
