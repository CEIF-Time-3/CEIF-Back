import { drizzle } from 'drizzle-orm/node-postgres';
import { categories } from '../schema/categories.schema.js';

export async function seedCategories() {
  const db = drizzle(process.env.DATABASE_URL!);

  console.log('🌱 Populando categorias...');

  const categoryList = [
    { name: 'pastel doce' },
    { name: 'pastel salgado' },
    { name: 'molhos' },
    { name: 'bebidas' },
  ];

  await db.insert(categories).values(categoryList).onConflictDoNothing();

  console.log('✅ Categorias populadas com sucesso!');
}
