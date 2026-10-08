import { Injectable } from "@nestjs/common";
import { DrizzleDB } from "../../infra/db/drizzle.provider.js";
import { DbExecutor } from "../../infra/db/types/databaseUser.type.js";
import { AddressRow, NewAddressRow } from "./types/address.type.js";
import { addresses } from "../../infra/db/schema/address.schema.js";

// address/infra/address.repository.t

@Injectable()
export class AddressRepository {
  constructor(private readonly db: DrizzleDB) {}   // mesmo provider que você usa no users

  async insertMany(
    rows: NewAddressRow[],
    executor: DbExecutor = this.db,   // fora de transação, usa o db
  ): Promise<AddressRow[]> {
    if (!rows.length) return [];      // .values([]) lança erro no Drizzle

    return executor.insert(addresses).values(rows).returning();
  }
}