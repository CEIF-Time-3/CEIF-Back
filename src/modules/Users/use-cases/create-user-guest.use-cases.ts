import { Injectable } from "@nestjs/common";
import { Result } from "../../../shared/types/result.js";
import { CreateUserWithAddressesDto } from "../DTO/create-user-with-address.dto.js";
import { PersistUserError } from "../Error/users.error.js";
import { UserWithAddresses } from "../types/users.types.js";
import { UsersRepository } from "../users.repository.js";
import { UserMapper } from "../Mapper/users.mapper.js";


// users/use-cases/create-user-guest.use-case.ts
@Injectable()
export class CreateUserGuestUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(dto: CreateUserWithAddressesDto): Promise<Result<UserWithAddresses, PersistUserError>> {
    const userRow = UserMapper.toEntity(dto);            // sem role: o banco aplica 'customer'
    return await this.usersRepository.createWithAddresses(userRow, dto.addresses);
  }
}