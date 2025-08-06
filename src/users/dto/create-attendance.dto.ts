import { isEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsEnum } from 'class-validator';
import { AttendanceStatus } from 'src/enums/attendance-status.enum';
import { AttendanceRecord} from 'src/users/entities/attendance_record.entity'; // adjust path


export class CreateAttendanceDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @IsNotEmpty()
  @IsString()
  classSection: string; // e.g., 'Math-7A'
}
