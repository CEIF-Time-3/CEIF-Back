import { IsString, MaxLength } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  @MaxLength(255)
  name: string;
}
