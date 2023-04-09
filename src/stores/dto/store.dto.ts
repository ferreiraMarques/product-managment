import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class StoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
