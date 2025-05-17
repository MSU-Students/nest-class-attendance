import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@ApiBearerAuth()
@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}
  
  @Roles(Role.Admin, Role.Supervisor)
  @ApiOperation({ summary: 'Find all users with supervisor role' })
  @Get()
  findAll() {
    return this.supervisorService.findAll();
  }

  @Roles(Role.Admin, Role.Supervisor)
  @ApiOperation({ summary: 'Find a supervisor by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supervisorService.findOne(+id);
  }

  @Roles(Role.Admin)                                // only admin can delete
  @ApiOperation({ summary: 'Delete a supervisor by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supervisorService.remove(+id);
  }

  @Roles(Role.Supervisor)                           // only supervisor can access
  @ApiOperation({ summary: 'Get an overview' })
  @Get('overview')
  getOverview() {
    return this.supervisorService.getOverview();
  }

  @Roles(Role.Supervisor, Role.Admin)
  @ApiOperation({ summary: 'Get an attendance summary' })
  @Get('attendance-summary')
  getAttendanceSummary(
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.supervisorService.getAttendanceSummary(from, to);
  }
}


 