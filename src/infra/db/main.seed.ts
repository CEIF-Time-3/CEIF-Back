import 'dotenv/config';
import { seedCategories } from './seeds/categories.seed.js';
import { seedProducts } from './seeds/products.seed.js';
import { seedUsers } from './seeds/users.seed.js';
import { seedAddresses } from './seeds/address.seed.js';

async function main() {
  console.log('🚀 Iniciando o processo de seeding...');

  try {
    await seedCategories();
    await seedUsers();
    await seedProducts();
    await seedAddresses();
    console.log('✨ Todos os seeds foram executados com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante o seeding:', error);
    process.exit(1);
  }
}

main();
