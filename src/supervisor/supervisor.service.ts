//import { InjectRepository } from '@nestjs/typeorm';
//import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { mockUsers } from 'src/mocks/users.mock';
import { mockAttendances } from 'src/mocks/attendances.mock';
import { mockMeetings } from 'src/mocks/meetings.mock';
import { mockClasses } from 'src/mocks/classes.mock';
import { AttendanceStatus } from 'src/enums/attendance-status.enum';


@Injectable()
export class SupervisorService {
  private readonly users = mockUsers; // Use mock data
  private readonly attendances = mockAttendances;
  private readonly meetings = mockMeetings;
  private readonly classes = mockClasses;


  async findAll() {
    const allUsers = this.users.filter(user => 
      user.roles.some(role => role.type === 'supervisor')
    );
    return allUsers;
  }

  async findOne(id: number) {
    const user = this.users.find(user => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    if (!user.roles.some(role => role.type === 'supervisor')) {
      throw new BadRequestException('User is not a supervisor');
    }
    return user;
  }
  
  remove(id: number) {
    return `This action removes a #${id} supervisor`;
  }

  
getOverview() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const totalStudents = this.users?.filter(
      user => user.roles?.some(role => role.type === 'student')
    )?.length || 0;
    
    const totalTeachers = this.users?.filter(
      user => user.roles?.some(role => role.type === 'teacher')
    )?.length || 0;
    
    const totalClasses = this.classes?.length || 0;

    const todayAttendance = this.attendances?.filter(
      attendance => attendance.createdAt?.toISOString().startsWith(today)) || [];

    const present = todayAttendance.filter(a => a.status === 'present')?.length || 0;
    const late = todayAttendance.filter(a => a.status === 'late')?.length || 0;
    const excused = todayAttendance.filter(a => a.status === 'excused')?.length || 0;
    const absent = todayAttendance.filter(a => a.status === 'absent')?.length || 0;
    
    // Calculate percentage (combining present and late as present)
    const totalAttended = present + late;
    const percentage_present = totalStudents > 0 
      ? ((totalAttended / totalStudents) * 100).toFixed(2) + '%' : '0%';

    const activeSessions = this.meetings?.filter(m => m.status === 'ongoing')?.length || 0;

    return {
      totalStudents,
      totalTeachers,
      totalClasses,
      attendanceToday: {
        present,
        late,
        excused,
        absent,
        percentage_present,
      },
      activeSessions,
    };
  }

 getAttendanceSummary(from?: string, to?: string) {
  const startDate = from ? new Date(from) : new Date('2000-01-01');
  const endDate = to ? new Date(to) : new Date('2100-01-01');

  const filteredAttendances = mockAttendances.filter(comment => {
    const date = comment.createdAt;
    return date >= startDate && date <= endDate;
  });

  const summaryMap = new Map<string, {
    date: string;
    className: string;
    classSection: string;
    present: number;
    absent: number;
    total: number;
  }>();

  for (const attendance of filteredAttendances) {
    const dateStr = attendance.createdAt.toISOString().split('T')[0];

    const meeting = mockMeetings.find(m => m.id === attendance.meeting[0].id);
    if (!meeting) continue;

    const classInfo = mockClasses.find(c => c.id === meeting.class[0].id);
    if (!classInfo) continue;

    const key = `${dateStr}-${classInfo.id}`;

    if (!summaryMap.has(key)) {
      summaryMap.set(key, {
        date: dateStr,
        className: classInfo.className,
        classSection: classInfo.classSection,
        present: 0,
        absent: 0,
        total: 0,
      });
    }

    const summary = summaryMap.get(key)!;

    if (attendance.status === AttendanceStatus.PRESENT) summary.present++;
    else if (attendance.status === AttendanceStatus.ABSENT) summary.absent++;

    summary.total++;
  }

  return Array.from(summaryMap.values());
}

}
