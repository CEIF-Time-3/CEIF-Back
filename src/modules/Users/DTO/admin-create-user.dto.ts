import { IsIn, IsOptional } from "class-validator";
import { CreateUserWithAddressesDto } from "./create-user-with-address.dto.js";
import { roleEnum } from "../../../infra/db/schema/users.schema.js";
import { type UserRole } from "../schema/users.schema.js";

// users/dto/admin-create-user.dto.ts
export class AdminCreateUserDto extends CreateUserWithAddressesDto {
  @IsOptional() @IsIn(roleEnum.enumValues)
  role?: UserRole;
}