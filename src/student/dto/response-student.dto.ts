// For API Responses
import { Attendance } from "src/attendance/entities/attendance.entity";

export class StudentResponseDto {
  id: number;
  studentCode: number;
  fullName: string;
  email: string;
  attendanceRate?: number;
  recentAttendances?: Attendance[];
}