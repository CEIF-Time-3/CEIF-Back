import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository.js";


// users/users.service.t
import { UserRole } from "./schema/users.schema.js";
import { AuthorizeActorError } from "./Error/users.error.js";
import { Result } from "../../shared/types/result.js";
import { fail,ok } from "../../shared/helpers/result.helper.js";
// users/users.service.ts
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async ensureAdmin(actorId?: string): Promise<Result<true, AuthorizeActorError>> {
    if (!actorId) return fail('INVALID_ACTOR');                  // sem identidade
    const actor = await this.usersRepository.findActorById(actorId);
    if (!actor || !actor.isActive) return fail('INVALID_ACTOR'); // id não existe ou inativo
    if (actor.role !== 'admin') return fail('FORBIDDEN');        // existe, mas não é admin
    return ok(true);
  }
}