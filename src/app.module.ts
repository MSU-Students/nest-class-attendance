import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Role } from './users/entities/role.entity';
import { RolesModule } from './users/roles.module'; //
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/entities/teacher.entity';
import { Student } from './student/entities/student.entity';
import { ClassModule } from './class/class.module';
import { Class } from './class/entities/class.entity';
import { CommentsModule } from './comments/comments.module';
import { MeetingsModule } from './meetings/meetings.module';
import { Meeting } from './meetings/entities/meeting.entity';
import { Comment } from './comments/entities/comment.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role.guard';
import { AuthModule } from './auth/auth.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { AttendanceModule } from './attendance/attendance.module';
import { Attendance } from './attendance/entities/attendance.entity';
import { StudentModule } from './student/student.module';
import { AttendanceRecord } from './users/entities/attendance_record.entity';
import { Supervisor } from './supervisor/entities/supervisor.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env'],
      load: [configuration],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('database.host') || 'localhost',
          port: configService.get<number>('database.port') || 3306,
          username: configService.get('database.username') || '',
          password: configService.get('database.pass') || '',
          database: 'ClassAttendanceDB',
          entities: [User, Role, AttendanceRecord, Supervisor, Teacher, Student, Class, Meeting, Attendance, Comment],
          synchronize: false,
        }
      },
      inject: [ConfigService]
    }),

    UsersModule,
    AuthModule,
    RolesModule,
    ClassModule,
    RolesModule, 
    TeacherModule,
    CommentsModule,
    MeetingsModule,
    SupervisorModule,
    AttendanceModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
