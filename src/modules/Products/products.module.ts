import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { ProductRepository } from './products.repository.js';
import { CategoryProductAdapter } from '../Categories/Adapter/category-product.adapter.js';
import { CategoriesModule } from '../Categories/categories.module.js';

@Module({
  imports: [CategoriesModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductRepository,
    { provide: 'category-product-adapter', useClass: CategoryProductAdapter },
  ],
})
export class ProductsModule {}
