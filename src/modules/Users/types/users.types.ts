import { users } from "../../../infra/db/schema/users.schema.js";
import { UserAddressResult } from "../Adapter/addressPort.js";
export type UserRow = typeof users.$inferSelect;
export type NewUserRow = Omit<
  typeof users.$inferInsert,
  'id' | 'isActive' | 'createdAt' | 'updatedAt'
>;
export type UserWithAddresses = UserRow & { addresses: UserAddressResult[] };