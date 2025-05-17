import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
