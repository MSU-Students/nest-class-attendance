import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Post()
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingsService.create(createMeetingDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Get()
  findAll() {
    return this.meetingsService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetingsService.findOne(+id, { relations: [] });
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingsService.update(+id, updateMeetingDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingsService.remove(+id);
  }
}
