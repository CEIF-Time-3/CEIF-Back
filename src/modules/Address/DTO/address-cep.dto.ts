// src/address/dto/get-address.dto.ts
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class GetAddressDto {
  @IsString()
  @IsNotEmpty({ message: 'O CEP não pode estar vazio' })
  @Length(8, 9, { message: 'O CEP deve ter entre 8 e 9 caracteres (com ou sem máscara)' })
  cep: string;
}