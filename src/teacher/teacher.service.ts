import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity'; 
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
      @InjectRepository(Teacher)
      private teacherRepository: Repository<Teacher>,
    ) {}
  
  
  
  create(createTeacherDto: CreateTeacherDto) {
    return this.teacherRepository.save(createTeacherDto);
  }

  findAll() {
    return this.teacherRepository.find;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
