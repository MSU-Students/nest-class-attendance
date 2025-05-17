import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { AttendanceRecord } from '../users/entities/attendance_record.entity';  // import attendance entity
import { AttendanceModule } from 'src/attendance/attendance.module';
import { RolesModule } from './roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, AttendanceRecord]),  // add AttendanceRecord here
    AttendanceModule, 
    RolesModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
