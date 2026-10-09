import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository.js';
import { ICategoryDTO } from './DTO/category-dto.js';
import { Result } from '../../shared/types/result.js';
import { CategoryCreateDto } from './DTO/category-create-validation.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async get(): Promise<Result<ICategoryDTO[], string>> {
    try {
      const categories = await this.categoriesRepository.findAll();

      if (!categories) {
        return { success: false, message: 'Categorias não encontradas' };
      }

      return { success: true, data: categories };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Erro interno no servidor' };
    }
  }

  async create(data: CategoryCreateDto): Promise<Result<string, string>> {
    try {
      await this.categoriesRepository.create(data);
      return { success: true, data: 'Categoria criada com sucesso!' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Erro interno no servidor' };
    }
  }

  async findUnique(id: string): Promise<Result<ICategoryDTO[], string>> {
    try {
      const categories = await this.categoriesRepository.findUnique(id);

      return {
        success: true,
        data: categories,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Erro interno no servidor' };
    }
  }
}
