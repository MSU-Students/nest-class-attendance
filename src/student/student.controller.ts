import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('Students')
@ApiBearerAuth()
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}


  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @ApiOperation({ summary: 'Retrieve all student profiles' })
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @ApiOperation({ summary: 'Get student profile by university ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Roles(Role.Admin, Role.Student)
  @ApiOperation({ summary: 'Get student profile by university ID' })
  @Patch(':id')
  updateProfile(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.updateProfile(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }

   @Roles(Role.Admin, Role.Supervisor, Role.Student)
  @Get(':studentCode/progress')
  @ApiOperation({ 
    summary: 'Get academic progress', 
    description: 'Returns current year level, program, and enrollment status' 
  })
  @ApiResponse({ status: 200, description: 'Academic progress retrieved' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async getAcademicProgress(@Param('studentCode') studentCode: number) {
    return this.studentService.getAcademicProgress(studentCode);
  }

  @Roles(Role.Admin, Role.Supervisor)
  @Get(':id/attendance')
  @ApiOperation({ 
    summary: 'Get attendance statistics', 
    description: 'Returns detailed attendance records with related classes' 
  })
  @ApiResponse({ status: 200, description: 'Attendance data retrieved' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async getAttendanceStats(@Param('id') id: number) {
    return this.studentService.getAttendanceStats(id);
  }
}
