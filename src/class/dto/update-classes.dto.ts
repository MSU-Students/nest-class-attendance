import { PartialType } from '@nestjs/swagger';
import { CreateClassesDto } from './create-classes.dto';

export class UpdateClassesDto extends PartialType(CreateClassesDto) {}
