import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('classes')
export class ClassController {
    constructor(private readonly classesService: ClassService) {}

@ApiBearerAuth()
@Roles(Role.Admin, Role.Supervisor, Role.Teacher)
@Post()
create(@Body() createClassesDto: CreateClassesDto) {
  return this.classesService.create(createClassesDto);
}

@ApiBearerAuth()
@Roles(Role.Admin, Role.Supervisor, Role.Teacher)
@Get()
findAll() {
  return this.classesService.findAll();
}

@ApiBearerAuth()
@Roles(Role.Admin, Role.Supervisor, Role.Teacher)
@Get(':id')
findOne(@Param('id') id: string) {
  return this.classesService.findOne(+id);
}

@ApiBearerAuth()
@Roles(Role.Admin, Role.Supervisor, Role.Teacher)
@Patch(':id')
update(@Param('id') id: string, @Body() UpdateClassesDto: UpdateClassesDto) {
  return this.classesService.update(+id, UpdateClassesDto);
}

@ApiBearerAuth()
@Roles(Role.Admin, Role.Supervisor, Role.Teacher)
@Delete(':id')
remove(@Param('id') id: string) {
  return this.classesService.remove(+id);
}}
