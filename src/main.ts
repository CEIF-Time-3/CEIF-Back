import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/Main/app.module.js';
import { ResultInterceptor } from './shared/interceptors/result.interceptor.js';
import { ValidationPipe } from '@nestjs/common';
import { ApiExceptionFilter } from './shared/http/api-expection-filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResultInterceptor());
 app.useGlobalFilters(new ApiExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}));
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
await bootstrap();
