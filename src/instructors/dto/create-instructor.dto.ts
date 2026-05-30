import { IsString, IsOptional, IsBoolean, IsInt, IsUrl, IsNotEmpty, Min } from 'class-validator';

export class CreateInstructorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  specialty?: string;

  @IsUrl()
  @IsOptional()
  photoUrl?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
