// users/ports/address.port.ts
import { type DbTransaction } from "../../../infra/db/types/databaseUser.type.js";

export interface NewUserAddress {
  zipCode: string;
  street: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
}

export interface UserAddressResult {
  id: string;                     
  zipCode: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  createdAt: Date;          
  updatedAt: Date;

}

export abstract class AddressPort {
  abstract createManyAddress(
    userId: string,
    addresses: NewUserAddress[],
    tx: DbTransaction,
  ): Promise<UserAddressResult[]>;
}