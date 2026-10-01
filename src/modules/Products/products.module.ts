import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
