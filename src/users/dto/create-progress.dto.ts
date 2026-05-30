import {
  IsEnum, IsOptional, IsNumber, IsInt,
  IsString, IsDateString, Min,
} from 'class-validator';
import { ProgressCategory } from '@prisma/client';

export class CreateProgressDto {
  @IsEnum(ProgressCategory)
  @IsOptional()
  category?: ProgressCategory;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  weight?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  reps?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
