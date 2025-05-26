import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @IsString()
  status: string; // 'present', 'absent', 'late', etc.

  @IsNotEmpty()
  @IsString()
  classSection: string; // e.g., 'Math-7A'
}
