import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { UpdateStudentDto } from './dto/update-student.dto';


@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // CRUD Methods
  
  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find({
      relations: ['classes', 'attendances'],
    });
  }

  async findOne(studentCode: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { studentCode },
      relations: ['classes', 'attendances.class'],
    });

    if (!student) {
      throw new NotFoundException(`Student profile ${studentCode} not found`);
    }
    return student;
  }
  
  async updateProfile(
    studentCode: number,
    updateData: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ studentCode });
  
    if (!student) {
      throw new NotFoundException(`Student ${studentCode} not found`);
    }
    
    // Only allow updates to these fields
    const updatableFields = {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      email: updateData.email,
      yearLevel: updateData.yearLevel,
      academicProgram: updateData.academicProgram,
      isActive: updateData.isActive,
    };

    Object.assign(student, updatableFields);
    return await this.studentRepository.save(student);
  }

  
  remove(studentCode: number) {
    return `This action removes a #${studentCode} student`;
  }


  // Analytics Method

  async getAttendanceStats(studentCode: number) {
    return this.studentRepository.findOne({
      where: { studentCode },
      relations: {
        attendances: true,
        classes: true
      },
      select: ['studentCode', 'firstName', 'lastName'] 
    });
  }

  async getAcademicProgress(studentCode: number) {
    const student = await this.studentRepository.findOne({ 
      where: { studentCode },
      select: ['yearLevel', 'academicProgram', 'isActive'] // Optimize query
    });
    
    if (!student) {
      throw new NotFoundException(`Student ${studentCode} not found`);
    }

    return {
      currentYear: student.yearLevel,
      program: student.academicProgram,
      enrollmentStatus: student.isActive ? 'Active' : 'Inactive',
      lastUpdated: new Date().toISOString()
    };
  }

  
}
