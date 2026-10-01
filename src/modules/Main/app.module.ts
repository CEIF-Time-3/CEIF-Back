import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from '../Products/products.module.js';
import { CategoriesModule } from '../Categories/categories.module.js';
import { DatabaseModule } from '../../infra/db/drizzle.module.js';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ProductsModule, CategoriesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
