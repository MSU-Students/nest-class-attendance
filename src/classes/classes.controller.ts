import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';

@Controller('classes')
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}

@Post()
create(@Body() createClassesDto: CreateClassesDto) {
  return this.classesService.create(createClassesDto);
}

@Get()
findAll() {
  return this.classesService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.classesService.findOne(+id);
}

@Patch(':id')
update(@Param('id') id: string, @Body() UpdateClassesDto: UpdateClassesDto) {
  return this.classesService.update(+id, UpdateClassesDto);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.classesService.remove(+id);
}}
