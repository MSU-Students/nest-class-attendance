import { Attendance } from 'src/attendance/entities/attendance.entity';
import { AttendanceStatus } from 'src/enums/attendance-status.enum';

export const mockAttendances: Attendance[] = [
  // Math 101 - Meeting 1 (3 students)
  {
    id: 1,
    status: AttendanceStatus.PRESENT,
    createdAt: new Date('2023-10-01T09:00:00'),
    meeting: { id: 1 } as any,
    student: { id: 1, studentCode: 202310001 } as any, // 2023 enrollment, 10001
    notes: 'Active participation in problem solving'
  },
  {
    id: 2,
    status: AttendanceStatus.LATE,
    createdAt: new Date('2023-10-01T09:15:00'),
    meeting: { id: 1 } as any,
    student: { id: 2, studentCode: 202310002 } as any, // 2023 enrollment, 10002
    notes: 'Arrived late with permission slip'
  },
  {
    id: 3,
    status: AttendanceStatus.ABSENT,
    createdAt: new Date('2023-10-01T09:00:00'),
    meeting: { id: 1 } as any,
    student: { id: 3, studentCode: 202210345 } as any, // 2022 enrollment, 10345
    notes: 'No prior notification'
  },

  // Science 201 - Meeting 1 (4 students)
  {
    id: 4,
    status: AttendanceStatus.PRESENT,
    createdAt: new Date('2023-10-02T10:00:00'),
    meeting: { id: 2 } as any,
    student: { id: 1, studentCode: 202310001 } as any,
    notes: 'Demonstrated lab experiment perfectly'
  },
  {
    id: 5,
    status: AttendanceStatus.PRESENT,
    createdAt: new Date('2023-10-02T10:00:00'),
    meeting: { id: 2 } as any,
    student: { id: 4, studentCode: 202311234 } as any, // 2023 enrollment, 11234
    notes: 'Excellent teamwork during lab'
  },
  {
    id: 6,
    status: AttendanceStatus.EXCUSED,
    createdAt: new Date('2023-10-02T09:55:00'),
    meeting: { id: 2 } as any,
    student: { id: 5, studentCode: 202209876 } as any, // 2022 enrollment, 09876
    notes: 'University-approved sports event'
  },
  {
    id: 7,
    status: AttendanceStatus.LATE,
    createdAt: new Date('2023-10-02T10:10:00'),
    meeting: { id: 2 } as any,
    student: { id: 2, studentCode: 202310002 } as any,
    notes: 'Public transport delay'
  },

  // History 301 - Meeting 1 (3 students)
  {
    id: 8,
    status: AttendanceStatus.PRESENT,
    createdAt: new Date('2023-10-03T13:00:00'),
    meeting: { id: 3 } as any,
    student: { id: 6, studentCode: 202312345 } as any, // 2023 enrollment, 12345
    notes: 'Outstanding historical analysis presented'
  },
  {
    id: 9,
    status: AttendanceStatus.ABSENT,
    createdAt: new Date('2023-10-03T13:00:00'),
    meeting: { id: 3 } as any,
    student: { id: 3, studentCode: 202210345 } as any,
    notes: 'No communication received'
  },
  {
    id: 10,
    status: AttendanceStatus.PRESENT,
    createdAt: new Date('2023-10-03T13:00:00'),
    meeting: { id: 3 } as any,
    student: { id: 7, studentCode: 202105678 } as any, // 2021 enrollment, 05678
    notes: 'Facilitated class discussion'
  }
];