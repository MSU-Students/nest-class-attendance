
export enum AttendanceStatus {
  PENDING = 'pending',    // Default state (student self-marked)
  PRESENT = 'present',    // Teacher-confirmed
  ABSENT = 'absent',      // Teacher-confirmed
  LATE = 'late',          // Teacher-confirmed
  EXCUSED = 'excused',    // Teacher-confirmed
}