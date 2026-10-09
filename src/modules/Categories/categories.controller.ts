import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { ICategoryDTO } from './DTO/category-dto.js';
import { Result } from '../../shared/types/result.js';
import { CategoryCreateDto } from './DTO/category-create-validation.js';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/categories')
  async list(): Promise<Result<ICategoryDTO[], string>> {
    return await this.categoriesService.get();
  }

  @Post('/categories')
  async create(
    @Body() data: CategoryCreateDto,
  ): Promise<Result<string, string>> {
    return await this.categoriesService.create(data);
  }
}
