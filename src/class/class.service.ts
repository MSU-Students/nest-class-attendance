import { Injectable, NotFoundException } from '@nestjs/common';
import { Class } from './entities/class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private classesRepository: Repository<Class>,
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
      ) {}

    async create(createClassesDto: CreateClassesDto) {
      const { teacherId, ...classData } = createClassesDto;

      // Find the teacher by ID
      const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });

      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
      }

      // Create a new class with the teacher relationship
      const newClass = this.classesRepository.create({
        ...classData,
        teacher: teacher
      });

      return this.classesRepository.save(newClass);
    }

    findAll() {
      return this.classesRepository.find({
        relations: ['teacher']
      });
    }

    async findOne(id: number) {
      const classEntity = await this.classesRepository.findOne({
        where: { id },
        relations: ['teacher']
      });

      if (!classEntity) {
        throw new NotFoundException(`Class with ID ${id} not found`);
      }

      return classEntity;
    }

    async update(id: number, updateClassesDto: UpdateClassesDto) {
      const { teacherId, ...classData } = updateClassesDto as any;

      // First check if the class exists
      const classEntity = await this.findOne(id);

      // If teacherId is provided, find the teacher
      if (teacherId) {
        const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });

        if (!teacher) {
          throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
        }

        // Update the class with the new teacher
        await this.classesRepository.update(id, {
          ...classData,
          teacher: teacher
        });
      } else {
        // Update without changing the teacher
        await this.classesRepository.update(id, classData);
      }

      return this.findOne(id);
    }

    async remove(id: number) {
      const classEntity = await this.findOne(id);
      return this.classesRepository.remove(classEntity);
    }
}
