// For Teacher Confirmations
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AttendanceStatus } from 'src/enums/attendance-status.enum';

export class UpdateAttendanceDto {
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus; // Teacher must set status

  @IsOptional()
  @IsString()
  comments?: string; // Optional notes (teacher-only)
}


