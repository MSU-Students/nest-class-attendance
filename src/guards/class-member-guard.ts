/*
import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { MeetingsService } from 'src/meetings/meetings.service';

@Injectable()
export class ClassMemberGuard implements CanActivate {
  constructor(private meetingsService: MeetingsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const meetingId = request.params.meetingId || request.body.meetingId;
  
    const meeting = await this.meetingsService.findOne(meetingId, {
      relations: ['classes', 'classes.students', 'classes.teacher']
    });
    
    if (!meeting) throw new NotFoundException('Meeting not found');

    // Check if user is a student/teacher in the class
    return meeting.class.students.some(student => student.id === user.id) || 
           meeting.class.teacher.id === user.id;
  }
}
*/
