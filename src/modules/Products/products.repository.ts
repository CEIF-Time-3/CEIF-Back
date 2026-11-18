import { Injectable } from '@nestjs/common';
import { DrizzleDB } from '../../infra/db/drizzle.provider.js';
import { products } from '../../infra/db/schema/products.schema.js';
import { ProductCreateDto } from './DTO/products-create-validation.dto.js';
import { IProductDTO, ProductDTO, ProductWithCategoryDTO } from './DTO/product-dto.js';
import { eq } from 'drizzle-orm';
import { categories } from '../../infra/db/schema/categories.schema.js';

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

  async productsWithCategory(): Promise<ProductWithCategoryDTO[] | null> {
    return await this.db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        imageUrl: products.imageUrl,
        description: products.description,
        available: products.available,
        ingredients: products.ingredients,
        categoryId: products.categoryId,
        categoryName: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));
  }

  async create(product: ProductCreateDto) {
    await this.db.insert(products).values(product);
  }

  async delete(id: string) {
    const [deletedProduct] = await this.db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    return deletedProduct;
  }

  async update(id: string, product: ProductDTO) {
    const [updatedProduct] = await this.db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }
}
