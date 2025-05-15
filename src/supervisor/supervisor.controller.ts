import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';


@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}
  
  //@ApiBearerAuth()
  //@Roles(Role.Admin, Role.Supervisor)
  @Get()
  findAll() {
    return this.supervisorService.findAll();
  }

  //@ApiBearerAuth()
  //@Roles(Role.Admin, Role.Supervisor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supervisorService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)                                // only admin can delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supervisorService.remove(+id);
  }

  @ApiBearerAuth()
  @Roles(Role.Supervisor)                           // only supervisor can access
  @Get('overview')
  getOverview() {
    return this.supervisorService.getOverview();
  }
}
