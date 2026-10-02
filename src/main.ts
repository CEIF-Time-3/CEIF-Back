import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/Main/app.module.js';
import { ResultInterceptor } from './modules/shared/interceptors/result.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResultInterceptor());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
await bootstrap();
