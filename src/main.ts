import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that do not have any decorator
      forbidNonWhitelisted: true, // Throws an error if properties without decorators are sent
      transform: true, // Automatically converts payloads to DTO class instances
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Project Management API')
    .setDescription('API documentation for managing portfolio projects.')
    .setVersion('1.0')
    .addTag('projects') // Optional: add tags to group endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Set up Swagger UI at a specific path (e.g., http://localhost:3000/api-docs)
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
