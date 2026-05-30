import { IsEnum, IsDateString, IsOptional, IsString, IsInt } from 'class-validator';
import { MembershipPlan } from '@prisma/client';

export class UpsertMembershipDto {
  @IsInt()
  userId: number;

  @IsEnum(MembershipPlan)
  plan: MembershipPlan;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
