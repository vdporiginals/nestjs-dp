import {
  IsEmail,
  IsDefined,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
class RegisterDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @IsDefined()
  password: string;
}

export default RegisterDto;
