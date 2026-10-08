import { CreateUserDto } from "../DTO/create-user.dto.js";
import { PublicUserResopnseDTO, UserResponseDto } from "../DTO/user-response.dto.js";
import { UserRole } from "../schema/users.schema.js";
import { NewUserRow, UserWithAddresses } from "../types/users.types.js";
// users/mappers/user.mapper.ts
export class UserMapper {
  // HTTP -> persistência
  static toEntity(
    dto: Pick<CreateUserDto, 'name' | 'email' | 'phone'>,
    role?: UserRole,                       // já autorizado pelo service
  ): NewUserRow {
    return {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      ...(role !== undefined && { role }), // sem role: a chave nem existe no objeto
    };
  }

  // persistência -> resposta HTTP
  static toResponse(user: UserWithAddresses): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      addresses: user.addresses.map(({  ...address }) => address),
    };
  }
  static toPublicResponse(user:UserWithAddresses): PublicUserResopnseDTO{
 return {
    email: user.email,
    name: user.name,
    phone: user.phone
 }
  }
}