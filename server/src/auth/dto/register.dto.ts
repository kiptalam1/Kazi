import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({
    message: 'First name must include letters',
  })
  @MinLength(3, { message: 'First name must be at least 3 characters long' })
  @MaxLength(32, { message: 'First name is too long' })
  firstName!: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({
    message: 'Last name must include letters',
  })
  @MinLength(3, { message: 'Last name must be at least 3 characters long' })
  @MaxLength(32, { message: 'Last name is too long' })
  lastName!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(undefined, { message: 'Enter a valid email' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must include letters' })
  @MinLength(6, { message: 'Password must be atleast 6 characters long ' })
  password!: string;

  @IsOptional()
  avatar!: string;

  @IsOptional()
  @IsString({ message: 'Enter a valid phone number' })
  phone!: string;
}
