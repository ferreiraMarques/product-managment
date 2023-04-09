import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @MaxLength(60)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;
}
