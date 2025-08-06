//For Student Self-Marking
import { IsNotEmpty, IsUUID } from 'class-validator';
import { IsIn } from 'class-validator';
import { AttendanceRecord } from 'src/users/entities/attendance_record.entity';

export class CreateAttendanceRecordDto {
  @IsIn(Object.values(AttendanceRecord))
  status: AttendanceRecord; 
}

export class CreateAttendanceDto {
  @IsUUID()
  @IsNotEmpty()
  meetingId: string; // Only meetingId needed (user comes from auth token)
}