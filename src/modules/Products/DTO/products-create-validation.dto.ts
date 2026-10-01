import {
  IsString,
  IsNumber,
  IsUUID,
  IsOptional,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  price: string;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsBoolean()
  available: boolean;

  @IsOptional()
  @IsString()
  ingredients?: string;
}
