import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Class } from 'src/class/entities/class.entity';
import { CommentsModule } from 'src/comments/comments.module';
import { Meeting } from 'src/meetings/entities/meeting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, Class, Meeting]),
    CommentsModule
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService]
})
export class TeacherModule {}
