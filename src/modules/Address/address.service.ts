import { Injectable } from "@nestjs/common";
import { AddressRepository } from "./addrtess.repository.js";
import { AddressMapper } from "./Mapper/address.mapper.js";
import { NewAddressInput } from "./types/address.type.js";
import { DbExecutor } from "../../infra/db/types/databaseUser.type.js";
import { AddressResponseDto } from "./DTO/address-response.dto.js";

// address/application/address.service.ts

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepo: AddressRepository,
  
  ) {}

  async createMany(
    userId: string,
    inputs: NewAddressInput[],
    executor?: DbExecutor,
  ): Promise<AddressResponseDto[]> {
    const entities = AddressMapper.toEntities(userId, inputs);
    const rows = await this.addressRepo.insertMany(entities, executor);
    return AddressMapper.toResponses(rows);
  }
}