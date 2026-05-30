import { IsString, IsOptional, IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class CreateWaitlistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  classScheduleId: number;
}
