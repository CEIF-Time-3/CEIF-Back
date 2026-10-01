import { Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service.js';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/products')
  listProducts(): string {
    return this.productsService.getProducts();
  }

  @Post('/products')
  create(): void {
    console.log('aoba');
  }
}
