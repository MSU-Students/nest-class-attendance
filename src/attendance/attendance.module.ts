import { Module, forwardRef } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/users/roles.module';

@Module({
  imports: [
    forwardRef(() => UsersModule), // Fix circular dependency
    forwardRef(() => RolesModule), // Fix circular dependency
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
