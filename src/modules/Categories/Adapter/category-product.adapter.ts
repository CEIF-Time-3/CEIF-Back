import { Injectable } from '@nestjs/common';
import { ProductCategoryAdapter } from '../../Products/Adapter/product-category.adpter.js';
import { CategoriesService } from '../categories.service.js';

@Injectable()
export class CategoryProductAdapter implements ProductCategoryAdapter {
  constructor(private readonly categoriesService: CategoriesService) {}

  async findUnique(id: string) {
    return await this.categoriesService.findUnique(id);
  }
}
