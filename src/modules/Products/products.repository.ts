import { Injectable } from '@nestjs/common';
import { DrizzleDB } from '../../infra/db/drizzle.provider.js';
import { products } from '../../infra/db/schema/products.schema.js';
import { ProductCreateDto } from './DTO/products-create-validation.dto.js';
import { IProductDTO } from './DTO/product-dto.js';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductRepository {
  constructor(private readonly db: DrizzleDB) {}

  async findAll(): Promise<IProductDTO[]> {
    return await this.db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        imageUrl: products.imageUrl,
        description: products.description,
        available: products.available,
        ingredients: products.ingredients,
      })
      .from(products);
  }

  async create(product: ProductCreateDto) {
    await this.db.insert(products).values(product);
  }

  async delete(id: string){
    return await this.db.delete(products).where(eq(products.id, id)).returning()
  }
}
