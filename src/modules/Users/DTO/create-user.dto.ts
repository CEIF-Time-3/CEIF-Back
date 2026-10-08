
import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { type UserRole } from '../schema/users.schema.js';
import { roleEnum } from '../../../infra/db/schema/users.schema.js';

export class CreateUserDto {
  @IsString() @IsNotEmpty()
  name: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail()
  email: string;

 @IsString() @MaxLength(20)
  phone: string;

}