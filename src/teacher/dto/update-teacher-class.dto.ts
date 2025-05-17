import { PartialType } from '@nestjs/swagger';
import { CreateTeacherClassDto } from './create-teacher-class.dto';

export class UpdateTeacherClassDto extends PartialType(CreateTeacherClassDto) {}
