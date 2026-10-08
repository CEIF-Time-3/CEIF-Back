
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @IsString() @IsNotEmpty() @MaxLength(20)
  zipCode: string;

  @IsString() @IsNotEmpty()
  street: string;

  @IsString() @IsNotEmpty() @MaxLength(20)
  number: string;

  @IsOptional() @IsString()
  complement?: string;

  @IsString() @IsNotEmpty()
  neighborhood: string;

  @IsString() @IsNotEmpty()
  city: string;

  @IsString() @IsNotEmpty() @MaxLength(50)
  state: string;
}