import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: "Name must be at least 3 characters long" })
  name!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsString()
  @IsOptional()
  website!: string;

  @IsString()
  @IsOptional()
  industry!: string

  @IsString()
  @IsOptional()
  location!: string;

  @IsString()
  @IsOptional()
  logoUrl!: string;
}
