import { drizzle } from 'drizzle-orm/node-postgres';
import { products } from '../schema/products.schema.js';
import { categories } from '../schema/categories.schema.js';
import { ProductCreateDto } from '../../../modules/Products/DTO/products-create-validation.dto.js';

export async function seedProducts() {
  const db = drizzle(process.env.DATABASE_URL!);

  console.log('🌱 Populando produtos...');

  const allCategories = await db.select().from(categories);

  if (allCategories.length === 0) {
    console.error(
      '❌ Nenhuma categoria encontrada! Execute o seed de categorias primeiro.',
    );
    return;
  }

  const categoryMap = new Map(allCategories.map((cat) => [cat.name, cat.id]));

  const productsList: ProductCreateDto[] = [
    {
      name: 'Pastel de Chocolate',
      price: '12.00',
      description: 'Pastel recheado com chocolate cremoso.',
      available: true,
      categoryId: categoryMap.get('pastel doce')!,
    },
    {
      name: 'Pastel de Carne',
      price: '10.00',
      description: 'Pastel crocante de carne moída temperada.',
      available: true,
      categoryId: categoryMap.get('pastel salgado')!,
    },
    {
      name: 'Coca-Cola 350ml',
      price: '6.00',
      description: 'Refrigerante lata gelado.',
      available: true,
      categoryId: categoryMap.get('bebidas')!,
    },
    {
      name: 'Maionese Caseira',
      price: '3.50',
      description: 'Molho especial da casa.',
      available: true,
      categoryId: categoryMap.get('molhos')!,
    },
  ];

  const validProducts = productsList.filter((p) => p.categoryId !== undefined);

  if (validProducts.length > 0) {
    await db.insert(products).values(validProducts).onConflictDoNothing();

    console.log('✅ Produtos vinculados e populados com sucesso!');
  }
}
