import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository.js';
import { ProductCreateDto } from './DTO/products-create-validation.dto.js';
import { IProductDTO } from './DTO/product-dto.js';
import { Result } from '../shared/types/result.js';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async getProducts(): Promise<Result<IProductDTO[], string>> {
    try {
      const products = await this.productsRepository.findAll();

      if (!products) {
        return { success: false, message: 'Produtos não encontrados' };
      }

      return { success: true, data: products };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Erro interno ao buscar produtos' };
    }
  }

  async createProduct(data: ProductCreateDto): Promise<Result<string, string>> {
    try {
      await this.productsRepository.create(data);
      return { success: true, data: 'Produto criado com sucesso!' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Erro interno ao buscar categorias' };
    }
  }
}
