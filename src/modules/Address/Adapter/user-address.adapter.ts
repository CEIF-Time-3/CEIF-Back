// address/adapters/user-address.adapter.ts
import { Injectable } from '@nestjs/common';
import { AddressPort,NewUserAddress,UserAddressResult } from '../../Users/Adapter/addressPort.js';
import type { DbTransaction } from '../../../infra/db/types/databaseUser.type.js';
import { AddressService } from '../address.service.js';

@Injectable()
export class UserAddressAdapter implements AddressPort {
  constructor(private readonly addressService: AddressService) {}

  createManyAddress(
    userId: string,
    addresses: NewUserAddress[],
    tx: DbTransaction,
  ): Promise<UserAddressResult[]> {
    return this.addressService.createMany(userId, addresses, tx);
  }
}