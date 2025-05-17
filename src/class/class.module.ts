import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Teacher])],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
