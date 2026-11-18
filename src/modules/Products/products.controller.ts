import { Controller, Get, Post, Body, Res, Delete, Param, Put } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductCreateDto } from './DTO/products-create-validation.dto.js';
import { IProductDTO, ProductDTO, ProductWithCategoryDTO } from './DTO/product-dto.js';
import { Result } from '../../shared/types/result.js';
import { get } from 'http';

type product = {
   id: string;
  name: string;
  price: string;
  imageUrl: string | null;
  description: string | null;
  available: boolean;
  ingredients: string | null;
}

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/products')
  async listProducts(): Promise<Result<IProductDTO[], string>> {
    return await this.productsService.getProducts();
  }

  @Get('products-with-category')
  async listProductsWithCategory(): Promise<Result<ProductWithCategoryDTO[], string>> {
    return await this.productsService.getProductsWithCategory();
  }

  @Post('/products')
  async create(
    @Body() data: ProductCreateDto,
  ): Promise<Result<string, string>> {
    return await this.productsService.createProduct(data);
  }

  @Delete('/products/:id')
  async delete(
    @Param('id') id: string
  ): Promise<Result<string, string>> {
    return await this.productsService.deleteProduct(id)
  }

  @Put('/products/:id')
  async update(
    @Param('id') id: string,
    @Body() data: ProductDTO,
  ): Promise<Result<string, string>> {
    return await this.productsService.updateProduct(id, data);
  }
}
