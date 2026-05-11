import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Setup global validation pipe with DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that are not defined in DTOs
      forbidNonWhitelisted: true, // Throw error if extra properties are sent
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  // Setup global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Setup Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('NestJS Backend API')
    .setDescription('A beginner-friendly NestJS backend with JWT authentication and role-based access control')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the server
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation available at: http://localhost:${port}/api`);
}
bootstrap();
