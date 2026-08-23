import { IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsOptional()
  @IsString()
  coverLetter?: string;

  @IsOptional()
  @IsString()
  resumeId?: string;
}
