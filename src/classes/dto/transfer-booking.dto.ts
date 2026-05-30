import { IsInt } from 'class-validator';

export class TransferBookingDto {
  @IsInt()
  newClassScheduleId: number;
}
