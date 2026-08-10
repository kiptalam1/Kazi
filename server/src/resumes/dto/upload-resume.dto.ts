import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UploadResumeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  displayName?: string;
}
