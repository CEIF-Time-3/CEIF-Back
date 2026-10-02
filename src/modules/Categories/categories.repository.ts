import { Injectable } from '@nestjs/common';
import { DrizzleDB } from '../../infra/db/drizzle.provider.js';
import { categories } from '../../infra/db/schema/categories.schema.js';
import { CategoryCreateDto } from './DTO/category-create-validation.js';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly db: DrizzleDB) {}

  async findAll() {
    return await this.db.select().from(categories);
  }

  async create(category: CategoryCreateDto) {
    return await this.db.insert(categories).values(category);
  }
}
