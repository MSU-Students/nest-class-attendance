import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { Class } from 'src/class/entities/class.entity';
import { CreateTeacherClassDto } from './dto/create-teacher-class.dto';
import { UpdateTeacherClassDto } from './dto/update-teacher-class.dto';
import { CommentsService } from 'src/comments/comments.service';
import { CreateAttendanceCommentDto } from './dto/create-attendance-comment.dto';
import { Meeting } from 'src/meetings/entities/meeting.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Class)
    private classesRepository: Repository<Class>,
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
    private commentsService: CommentsService
  ) {}

  create(createTeacherDto: CreateTeacherDto) {
    return this.teacherRepository.save(createTeacherDto);
  }

  findAll() {
    return this.teacherRepository.find({
      relations: ['classes', 'user']
    });
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['classes', 'user']
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.findOne(id);

    Object.assign(teacher, updateTeacherDto);

    return this.teacherRepository.save(teacher);
  }

  async remove(id: number) {
    const teacher = await this.findOne(id);
    return this.teacherRepository.remove(teacher);
  }


  async createClass(teacherId: number, createTeacherClassDto: CreateTeacherClassDto) {
    const teacher = await this.findOne(teacherId);

    const newClass = this.classesRepository.create({
      ...createTeacherClassDto,
      teacher: teacher
    });

    return this.classesRepository.save(newClass);
  }

  async getClasses(teacherId: number) {
    const teacher = await this.findOne(teacherId);
    return teacher.classes;
  }

  async getClass(teacherId: number, classId: number) {
    const teacher = await this.findOne(teacherId);

    const classEntity = teacher.classes.find(c => c.id === classId);

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${classId} not found for teacher with ID ${teacherId}`);
    }

    return classEntity;
  }

  async updateClass(teacherId: number, classId: number, updateTeacherClassDto: UpdateTeacherClassDto) {
    await this.findOne(teacherId);

    const classEntity = await this.classesRepository.findOne({
      where: { id: classId, teacher: { id: teacherId } },
      relations: ['teacher']
    });

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${classId} not found for teacher with ID ${teacherId}`);
    }

    Object.assign(classEntity, updateTeacherClassDto);

    return this.classesRepository.save(classEntity);
  }

  async removeClass(teacherId: number, classId: number) {
    await this.findOne(teacherId);

    const classEntity = await this.classesRepository.findOne({
      where: { id: classId, teacher: { id: teacherId } },
      relations: ['teacher']
    });

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${classId} not found for teacher with ID ${teacherId}`);
    }

    return this.classesRepository.remove(classEntity);
  }


  async getMeetings(teacherId: number, classId: number) {
    await this.findOne(teacherId);

    const classEntity = await this.classesRepository.findOne({
      where: { id: classId, teacher: { id: teacherId } },
      relations: ['meetings']
    });

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${classId} not found for teacher with ID ${teacherId}`);
    }

    return classEntity.meetings;
  }

  async getMeeting(teacherId: number, classId: number, meetingId: number) {
    await this.findOne(teacherId);

    const classEntity = await this.classesRepository.findOne({
      where: { id: classId, teacher: { id: teacherId } },
      relations: ['meetings']
    });

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${classId} not found for teacher with ID ${teacherId}`);
    }

    const meeting = await this.meetingRepository.findOne({
      where: { id: meetingId, class: { id: classId } },
      relations: ['comments', 'comments.user']
    });

    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${meetingId} not found for class with ID ${classId}`);
    }

    return meeting;
  }

  async createAttendanceComment(teacherId: number, createAttendanceCommentDto: CreateAttendanceCommentDto) {
    await this.findOne(teacherId);

    const meeting = await this.meetingRepository.findOne({
      where: { id: createAttendanceCommentDto.meetingId },
      relations: ['classes', 'classes.teacher']
    });

    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${createAttendanceCommentDto.meetingId} not found`);
    }

    const belongsToTeacher = meeting.class.teacher && meeting.class.teacher.id === teacherId;

    if (!belongsToTeacher) {
      throw new UnauthorizedException(`Teacher with ID ${teacherId} is not authorized to add comments to meeting with ID ${createAttendanceCommentDto.meetingId}`);
    }

    return this.commentsService.create({
      content: createAttendanceCommentDto.content,
      meetingId: createAttendanceCommentDto.meetingId,
      userId: createAttendanceCommentDto.studentId,
      createdAt: createAttendanceCommentDto.createdAt || new Date()
    });
  }

  async getAttendanceComments(teacherId: number, meetingId: number) {
    await this.findOne(teacherId);

    const meeting = await this.meetingRepository.findOne({
      where: { id: meetingId },
      relations: ['classes', 'classes.teacher', 'comments', 'comments.user']
    });

    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${meetingId} not found`);
    }

    const belongsToTeacher = meeting.class.teacher && meeting.class.teacher.id === teacherId;

    if (!belongsToTeacher) {
      throw new UnauthorizedException(`Teacher with ID ${teacherId} is not authorized to view comments for meeting with ID ${meetingId}`);
    }

    return meeting.comments;
  }
}
