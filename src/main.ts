import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NEST APP')
    .setDescription('REST API DOCUMENTATION')
    .setVersion('1.0.0')
    .addTag('Todo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  const authGuard = app.select(AuthModule).get(JwtAuthGuard);
  //app.useGlobalGuards(authGuard);
  app.enableCors();
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
