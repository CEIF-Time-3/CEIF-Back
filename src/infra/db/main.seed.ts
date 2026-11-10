import 'dotenv/config';
import { seedCategories } from './seeds/categories.seed.js';
import { seedProducts } from './seeds/products.seed.js';
import { seedUsers } from './seeds/users.seed.js';
import { seedAddresses } from './seeds/address.seed.js';
import { DrizzleDB } from './drizzle.provider.js';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../modules/Main/app.module.js';

async function main() {
  console.log('🚀 Iniciando o processo de seeding...');

  const app = await NestFactory.createApplicationContext(AppModule);
  const db = app.get(DrizzleDB);

  try {
    await seedCategories(db);
    await seedUsers(db);
    await seedProducts(db);
    await seedAddresses(db);
    console.log('✨ Todos os seeds foram executados com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante o seeding:', error);
    process.exit(1);
  }
}

main();
