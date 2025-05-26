import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from './entities/attendance_record.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private readonly attendanceRepo: Repository<AttendanceRecord>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(dto: CreateAttendanceDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new Error('User not found');

    const record = this.attendanceRepo.create({
      status: dto.status,
      classSection: dto.classSection,
      user: user
    });
    return this.attendanceRepo.save(record);
  }

  async findAll() {
    return this.attendanceRepo.find({ relations: ['user'] });
  }

  async findByUser(userId: number) {
    return this.attendanceRepo.find({
      where: { user: { id: userId } },
      relations: ['user']
    });
  }
}
