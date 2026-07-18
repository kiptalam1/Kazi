import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(undefined, { message: 'Enter a valid email' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}
