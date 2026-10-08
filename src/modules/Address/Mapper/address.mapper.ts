import { Injectable } from "@nestjs/common";
import { AddressRow, NewAddressInput, NewAddressRow } from "../types/address.type.js";
import { AddressResponseDto } from "../DTO/address-response.dto.js";

// address/application/address.mapper.ts
@Injectable()



// address/mapper/address.mapper.ts   (sem @Injectable)
export class AddressMapper {
  static toEntity(userId: string, input: NewAddressInput): NewAddressRow {
    return {
      userId,
      zipCode: input.zipCode.trim(),
      street: input.street.trim(),
      number: input.number.trim(),
      complement: input.complement?.trim() || null,
      neighborhood: input.neighborhood.trim(),
      city: input.city.trim(),
      state: input.state.trim(),
    };
  }

  static toEntities(userId: string, inputs: NewAddressInput[]): NewAddressRow[] {
    return inputs.map((input) => AddressMapper.toEntity(userId, input));
  }

   static  toResponse(row: AddressRow): AddressResponseDto {
    return {
      id: row.id,
      zipCode: row.zipCode,
      street: row.street,
      number: row.number,
      complement: row.complement,
      neighborhood: row.neighborhood,
      city: row.city,
      state: row.state,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }


  static toResponses(rows: AddressRow[]): AddressResponseDto[] {
    return rows.map((row) => AddressMapper.toResponse(row));
  }
}