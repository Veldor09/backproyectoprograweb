import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLeadDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '8888-9999' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Bajar grasa' })
  @IsString()
  @IsNotEmpty()
  goal: string;

  @ApiPropertyOptional({ example: 'Me interesa el plan Pro' })
  @IsString()
  @IsOptional()
  message?: string;
}
