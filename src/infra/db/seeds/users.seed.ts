import { users } from '../schema/users.schema.js';
import { DrizzleDB } from '../drizzle.provider.js';

export async function seedUsers(db: DrizzleDB) {
  console.log('🌱 Populando usuários...');

  const usersList = [
    {
      name: 'Administrador do Sistema',
      email: 'admin@ceif.com',
      phone: '85999990001',
      role: 'admin' as const,
      isActive: true,
    },
    {
      name: 'Atendente João',
      email: 'employee@ceif.com',
      phone: '85999990002',
      role: 'employee' as const,
      isActive: true,
    },
    {
      name: 'Maria Silva',
      email: 'cliente1@ceif.com',
      phone: '85999990003',
      role: 'customer' as const,
      isActive: true,
    },
    {
      name: 'Carlos Eduardo',
      email: 'cliente2@ceif.com',
      phone: '85999990004',
      role: 'customer' as const,
      isActive: true,
    },
  ];

  await db.insert(users).values(usersList).onConflictDoNothing();

  console.log('✅ Usuários populados com sucesso!');
}
