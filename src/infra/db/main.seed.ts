import 'dotenv/config';
import { seedCategories } from './seeds/categories.seed.js';
import { seedProducts } from './seeds/products.seed.js';

async function main() {
  console.log('🚀 Iniciando o processo de seeding...');

  try {
    await seedCategories();

    //! Dependem de outras
    await seedProducts();
    console.log('✨ Todos os seeds foram executados com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante o seeding:', error);
    process.exit(1);
  }
}

main();
