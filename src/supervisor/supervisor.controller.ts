import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';


@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

 

  @Get()
  findAll() {
    return this.supervisorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supervisorService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supervisorService.remove(+id);
  }

  @Get('overview')
  getOverview() {
    return this.supervisorService.getOverview();
  }
}
