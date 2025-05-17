import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Class } from 'src/class/entities/class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  studentCode: number;  // University ID

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  academicProgram: string;

  @Column()
  yearLevel: number;

  @Column({ default: true })
  isActive: boolean;

  // Relationships
  @OneToMany(() => Attendance, attendance => attendance.student)
  attendances: Attendance[];

  @ManyToMany(() => Class, cls => cls.students)
  classes: Class[];
}