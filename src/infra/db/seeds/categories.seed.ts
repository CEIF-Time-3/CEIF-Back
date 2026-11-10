import { categories } from '../schema/categories.schema.js';
import { DrizzleDB } from '../drizzle.provider.js';

export async function seedCategories(db: DrizzleDB) {
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
