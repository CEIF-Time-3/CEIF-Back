import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository.js';
import { ProductCreateDto } from './DTO/products-create-validation.dto.js';
import { IProductDTO } from './DTO/product-dto.js';
import { Result } from '../shared/types/result.js';
import { CategoryProductAdapter } from '../Categories/Adapter/category-product.adapter.js';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductRepository,
    @Inject('category-product-adapter')
    private readonly categoryProductAdapter: CategoryProductAdapter,
  ) {}

  async getProducts(): Promise<Result<IProductDTO[], string>> {
    try {
      const products = await this.productsRepository.findAll();

      if (!products) {
        return { success: false, message: 'Produtos não encontrados' };
      }

      return { success: true, data: products };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Erro interno no servidor' };
    }
  }

  async createProduct(data: ProductCreateDto): Promise<Result<string, string>> {
    try {
      const categoryResult = await this.categoryProductAdapter.findUnique(
        data.categoryId,
      );

      console.log(categoryResult);

      if (!categoryResult.success) {
        return { success: false, message: 'Erro ao buscar categoria.' };
      }

      if (categoryResult.success && categoryResult.data.length === 0) {
        return { success: false, message: 'Catagoria não encontrada.' };
      }

      await this.productsRepository.create(data);
      return { success: true, data: 'Produto criado com sucesso!' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Erro interno no servidor' };
    }
  }
}
