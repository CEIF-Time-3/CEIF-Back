import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service.js';
import { ProductCreateDto } from './DTO/products-create-validation.dto.js';
import { IProductDTO, ProductDTO, ProductWithCategoryDTO } from './DTO/product-dto.js';
import { Result } from '../../shared/types/result.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';

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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async create(
    @Body() data: ProductCreateDto,
  ): Promise<Result<string, string>> {
    return await this.productsService.createProduct(data);
  }

  @Delete('/products/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async delete(
    @Param('id') id: string
  ): Promise<Result<string, string>> {
    return await this.productsService.deleteProduct(id)
  }

  @Put('/products/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() data: ProductDTO,
  ): Promise<Result<string, string>> {
    return await this.productsService.updateProduct(id, data);
  }
}
