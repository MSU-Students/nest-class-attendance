import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Column, Entity, ManyToOne, OneToMany, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    className: string;

    @Column()
    classSchedule: Date;

    @Column()
    classSection: string;

    @OneToMany(() => Meeting, meeting => meeting.class)
    meetings: Meeting[];

    @ManyToOne(() => Teacher, teacher => teacher.classes)
    teacher: Teacher;

    @ManyToMany(() => Student, student => student.classes)
    students: Student[];
}