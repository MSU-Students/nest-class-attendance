import { Injectable } from '@nestjs/common';


@Injectable()
export class SupervisorService {
  findAll() {
    return `This action returns all supervisor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supervisor`;
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
}
