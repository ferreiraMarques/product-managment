import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsInt()
  stock: number;

  @IsInt()
  storeId: number;
}
