import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateLeadDto {
  @IsString()
  @IsOptional()
  @IsIn(['NUEVO', 'CONTACTADO', 'EN_PROCESO', 'CONVERTIDO', 'PERDIDO'])
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
