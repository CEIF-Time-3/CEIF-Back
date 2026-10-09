import { Injectable } from "@nestjs/common";
import { fail } from "../../../shared/helpers/result.helper.js";
import { Result } from "../../../shared/types/result.js";
import { AdminCreateUserDto } from "../DTO/admin-create-user.dto.js";
import { AuthorizeActorError, PersistUserError } from "../Error/users.error.js";
import { UserWithAddresses } from "../types/users.types.js";
import { UsersRepository } from "../users.repository.js";
import { UsersService } from "../users.service.js";
import { UserMapper } from "../Mapper/users.mapper.js";

// users/use-cases/admin-create-user.use-case.ts
@Injectable()
export class AdminCreateUserUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    dto: AdminCreateUserDto,
    actorId?: string,
  ): Promise<Result<UserWithAddresses, AuthorizeActorError | PersistUserError>> {
    const auth = await this.usersService.ensureAdmin(actorId);   
    if (!auth.success) return fail(auth.message);

    const userRow = UserMapper.toEntity(dto, dto.role);         
    return this.usersRepository.createWithAddresses(userRow, dto.addresses);
  }
}