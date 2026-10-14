import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository.js';
import { ProductCreateDto } from './DTO/products-create-validation.dto.js';
import { IProductDTO } from './DTO/product-dto.js';
import { Result } from '../../shared/types/result.js';
import { CategoryProductAdapter } from '../Categories/Adapter/category-product.adapter.js';
import { ProductCollection } from './Iterator/product.collection.js';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductRepository,
    @Inject('category-product-adapter')
    private readonly categoryProductAdapter: CategoryProductAdapter,
  ) {}

  async getProducts(): Promise<Result<IProductDTO[], string>> {
    try {
      const rawProducts = await this.productsRepository.findAll();

      if (!rawProducts) {
        return { success: false, message: 'Produtos não encontrados' };
      }

      const productCollection = new ProductCollection(rawProducts);

      const iterator = productCollection.createIterator();

      const processedProducts: IProductDTO[] = [];

      while (iterator.hasNext()) {
        const product = iterator.next();
        processedProducts.push(product);
      }

      return { success: true, data: processedProducts };
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

  async deleteProduct(id: string): Promise<Result<string, string>> {
    try {
      const response = await this.productsRepository.delete(id);

      if (response.length == 0) {
        return { success: false, message: 'Produto não encontrado' };
      }

      return { success: true, data: 'Produto deletado com sucesso' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Erro interno no servidor' };
    }
  }
}
