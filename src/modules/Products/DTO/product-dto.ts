import {
  IsString,
  IsNumber,
  IsUUID,
  IsOptional,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';

export interface IProductDTO {
  id: string;
  name: string;
  price: string;
  imageUrl: string | null;
  description: string | null;
  available: boolean;
  ingredients: string | null;
}

export class ProductDTO {
  @IsString()
  id: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  price: string;

  @IsOptional()
  @IsString()
  imageUrl?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string | null;

  @IsBoolean()
  available: boolean;

  @IsOptional()
  @IsString()
  ingredients?: string | null;
}

export class ProductWithCategoryDTO extends ProductDTO {
  @IsUUID()
  categoryId: string;

  @IsString()
  @MaxLength(255)
  categoryName: string | null;
}
