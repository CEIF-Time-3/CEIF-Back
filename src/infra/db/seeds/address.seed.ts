import { drizzle } from 'drizzle-orm/node-postgres';
import { addresses } from '../schema/address.schema.js';
import { users } from '../schema/users.schema.js';

export async function seedAddresses() {
  const db = drizzle(process.env.DATABASE_URL!);

  console.log('🌱 Populando endereços...');

  const allUsers = await db.select().from(users);

  if (allUsers.length === 0) {
    console.error(
      '❌ Nenhum usuário encontrado! Execute o seed de usuários primeiro.',
    );
    return;
  }


  const userMap = new Map(allUsers.map((user) => [user.email, user.id]));

  const rawAddresses = [
    {
      userEmail: 'cliente1@ceif.com',
      zipCode: '60000-000',
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 101',
      neighborhood: 'Centro',
      city: 'Fortaleza',
      state: 'CE',
    },
    {
      userEmail: 'cliente1@ceif.com',
      zipCode: '60111-222',
      street: 'Avenida Beira Mar',
      number: '4560',
      complement: 'Bloco B',
      neighborhood: 'Meireles',
      city: 'Fortaleza',
      state: 'CE',
    },
    {
      userEmail: 'cliente2@ceif.com',
      zipCode: '60333-444',
      street: 'Rua Principal',
      number: '789',
      neighborhood: 'Aldeota',
      city: 'Fortaleza',
      state: 'CE',
    },
  ];

  const addressesList = rawAddresses
    .map((item) => {
      const userId = userMap.get(item.userEmail);
      if (!userId) return null;

      const { userEmail, ...addressData } = item;
      return {
        ...addressData,
        userId,
      };
    })
    .filter((addr) => addr !== null);

  if (addressesList.length > 0) {
    await db.insert(addresses).values(addressesList).onConflictDoNothing();

    console.log('✅ Endereços vinculados e populados com sucesso!');
  }
}