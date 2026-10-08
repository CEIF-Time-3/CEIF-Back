import { pgTable, serial, text, varchar, boolean, timestamp, pgEnum,uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { addresses } from './address.schema.js';

export const roleEnum = pgEnum('role', ['customer', 'employee','admin']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: varchar('phone', { length: 20 }).notNull(),
  role: roleEnum('role').default('customer').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
}));
