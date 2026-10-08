import { Injectable } from "@nestjs/common";

import { AddressPort, NewUserAddress } from "./Adapter/addressPort.js";
import { DrizzleDB } from "../../infra/db/drizzle.provider.js";
import { users } from "../../infra/db/schema/users.schema.js";
import { fail,ok } from "../../shared/helpers/result.helper.js";
import { eq } from "drizzle-orm";
import { NewUserRow, UserWithAddresses } from "./types/users.types.js";
import { Result } from "../../shared/types/result.js";
import { PersistUserError } from "./Error/users.error.js";
// users/users.repository.ts

// users/users.repository.ts
// users/users.repository.ts
@Injectable()
export class UsersRepository {
  constructor(
    private readonly db: DrizzleDB,
    private readonly addressPort: AddressPort,          // injeção normal, sem @Inject
  ) {}

  async findActorById(id: string) {
    const [actor] = await this.db
      .select({ id: users.id, role: users.role, isActive: users.isActive })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return actor;                                        // undefined se não existir
  }

  async createWithAddresses(
    data: NewUserRow,
    addresses: NewUserAddress[] = [],
  ): Promise<Result<UserWithAddresses, PersistUserError>> {
    try {
      const created = await this.db.transaction(async (tx) => {
        const [user] = await tx.insert(users).values(data).returning();
        const createdAddresses = addresses.length
          ? await this.addressPort.createManyAddress(user.id, addresses, tx)
          : [];
        return { ...user, addresses: createdAddresses };
      });
      return ok(created);
    } catch (err) {
      const pgError = (err as any)?.cause ?? err;
      if (pgError?.code === '23505' && pgError?.constraint === 'users_email_unique') {
        return fail('EMAIL_ALREADY_IN_USE');
      }
      
      throw err;
    }
  }
}