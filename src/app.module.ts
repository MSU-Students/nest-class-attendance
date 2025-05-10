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
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { Classes } from './classes/entities/classes.entity';
import { CommentsModule } from './comments/comments.module';
import { MeetingsModule } from './meetings/meetings.module';
import { Meeting } from './meetings/entities/meeting.entity';
import { Comment } from './comments/entities/comment.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role.guard';
import { AuthModule } from './auth/auth.module';

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
          entities: [User, Role, Teacher, Classes, Meeting, Comment],
          synchronize: true,
        }
      },
      inject: [ConfigService]
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    ClassesModule,
    TeacherModule,
    StudentsModule,
    CommentsModule,
    MeetingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }
