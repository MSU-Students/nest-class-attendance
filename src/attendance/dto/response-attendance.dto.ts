// For API Responses
import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus } from 'src/enums/attendance-status.enum';

export class AttendanceResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: AttendanceStatus })
  status: AttendanceStatus;

  @ApiProperty()
  meetingId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ required: false })
  notes?: string;
}