import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
//import { InjectRepository } from '@nestjs/typeorm';
//import { Repository } from 'typeorm';
import { mockUsers } from '../mocks';


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

  async getAttendanceSummary(from: string, to: string) {
  // For now, return mock data similar to your existing style
  return {
    from,
    to,
    summary: [
      { date: '2025-05-01', totalStudents: 100, present: 95, absent: 5 },
      { date: '2025-05-02', totalStudents: 98, present: 94, absent: 4 },
    ],
    trends: {
      sectionA: { present: 50, absent: 2 },
      sectionB: { present: 45, absent: 3 },
    },
  };
}

}
