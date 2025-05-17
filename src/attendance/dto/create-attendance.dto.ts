//For Student Self-Marking
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAttendanceDto {
  @IsUUID()
  @IsNotEmpty()
  meetingId: string; // Only meetingId needed (user comes from auth token)
}