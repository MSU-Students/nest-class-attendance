import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
//import { InjectRepository } from '@nestjs/typeorm';
//import { Repository } from 'typeorm';
import { mockUsers } from '../mocks';
import { mockComments } from 'src/comments/mock/mock-comments';
import { mockMeetings } from 'src/meetings/mock/mock-meetings';
import { mockClasses } from 'src/classes/mock/mock-classes';


@Injectable()
export class SupervisorService {
  private readonly users = mockUsers; // Use mock data

  //constructor(
  //  @InjectRepository(User)
  //  private userRepo: Repository<User>,
  //) {}

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
    // Mock data
    return {
      totalStudents: 200,
      totalTeachers: 20,
      totalClasses: 10,
      attendanceToday: {
        present: 180,
        absent: 20,
        percentage: '90%',
      },
      activeSessions: 3,
    };
  }

 getAttendanceSummary(from?: string, to?: string) {
  const startDate = from ? new Date(from) : new Date('2000-01-01');
  const endDate = to ? new Date(to) : new Date('2100-01-01');

  const filteredComments = mockComments.filter(comment => {
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

  for (const comment of filteredComments) {
    const dateStr = comment.createdAt.toISOString().split('T')[0];

    const meeting = mockMeetings.find(m => m.id === comment.meeting.id);
    if (!meeting) continue;

    const classInfo = mockClasses.find(c => c.id === meeting.classes.id);
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

    if (comment.content === 'present') summary.present++;
    else if (comment.content === 'absent') summary.absent++;

    summary.total++;
  }

  return Array.from(summaryMap.values());
}

}
