import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetCompanyQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(100)
  @IsInt()
  limit = 10;

  @IsOptional()
  @IsString()
  search?: string;
}
