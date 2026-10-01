import {
  pgTable,
  uuid,
  varchar,
  decimal,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const productCategorys = pgTable('product-categorys', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  productCategoryId: uuid('product_category_id')
    .notNull()
    .references(() => productCategorys.id, { onDelete: 'cascade' }),
  imageUrl: text('image_url'),
  description: varchar('description', { length: 500 }),
  available: boolean('available').notNull().default(true),
  ingredients: text('ingredients'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productCategorysRelations = relations(
  productCategorys,
  ({ many }) => ({
    products: many(products),
  }),
);

export const productsRelations = relations(products, ({ one }) => ({
  category: one(productCategorys, {
    fields: [products.productCategoryId],
    references: [productCategorys.id],
  }),
}));
