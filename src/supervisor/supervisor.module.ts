import { Module } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { SupervisorController } from './supervisor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Class } from 'src/class/entities/class.entity'; 
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { UsersModule } from '../users/users.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Class, Attendance]), 
    UsersModule],
  controllers: [SupervisorController],
  providers: [SupervisorService],
})
export class SupervisorModule {}
