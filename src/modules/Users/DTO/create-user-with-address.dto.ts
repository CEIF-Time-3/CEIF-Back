
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsOptional, ValidateNested } from 'class-validator';

import { CreateUserDto } from './create-user.dto.js';
import { CreateAddressDto } from '../../Address/DTO/create-address.dto.js';

export class CreateUserWithAddressesDto extends CreateUserDto {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses?: CreateAddressDto[];
}