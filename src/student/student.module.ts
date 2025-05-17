import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { Class } from 'src/class/entities/class.entity'; 
import { Attendance } from 'src/attendance/entities/attendance.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([Student, Class, Attendance]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  //  exports: [StudentsService], 
})
export class StudentModule {}
