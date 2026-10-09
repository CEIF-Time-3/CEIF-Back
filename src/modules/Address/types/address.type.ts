import { addresses } from "../../../infra/db/schema/address.schema.js";

export type AddressRow = typeof addresses.$inferSelect;
export type NewAddressRow = typeof addresses.$inferInsert;

// O que vem de fora: sem id, userId nem timestamps.
export type NewAddressInput = Omit<
  NewAddressRow,
  'id' | 'userId' | 'createdAt' | 'updatedAt'
>;