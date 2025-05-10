import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private repo: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    return this.repo.save(createStudentDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(StudentId: number) {
    return this.repo.findBy({StudentId})
  }

  update(StudentId: number, updateStudentDto: UpdateStudentDto) {
    return this.repo.update(StudentId, updateStudentDto);
  }

  remove(StudentId: number) {
    return this.repo.delete(StudentId);
  }
}
