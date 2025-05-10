import { Injectable } from '@nestjs/common';
import { Classes } from './entities/classes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';

@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(Classes)
        private classesRepository: Repository<Classes>,
      ) {}
    
    
    
    create(createClassesDto: CreateClassesDto) {
      return this.classesRepository.save(createClassesDto);
    }
  
    findAll() {
      return this.classesRepository.find;
    }
  
    findOne(id: number) {
      return `This action returns a #${id} teacher`;
    }
  
    update(id: number, updateClassesDto: UpdateClassesDto) {
      return `This action updates a #${id} teacher`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} teacher`;
    }
}
