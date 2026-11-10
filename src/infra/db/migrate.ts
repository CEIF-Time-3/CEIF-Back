import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

async function runMigrations() {
  console.log('⏳ Iniciando as migrations do banco de dados...');

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL não está definida nas variáveis de ambiente.',
    );
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  const db = drizzle(pool);

  try {
    await migrate(db, { migrationsFolder: './drizzle' });

    console.log('✅ Migrations concluídas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao rodar as migrations:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
