import { Class } from "src/class/entities/class.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Attendance } from "src/attendance/entities/attendance.entity";
import { MeetingStatus } from "src/enums/meeting-status.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content?: string;
    
    @Column()
    createdAt: Date;

    @Column({type: 'enum', enum: MeetingStatus, default: MeetingStatus.UPCOMING,})
    status: MeetingStatus;

    @OneToMany(() => Attendance, attendance => attendance.meeting)
    attendances: Attendance[];   // Attendance records for this meeting

    @ManyToOne(() => Class, (cls) => cls.meetings, { cascade: true })
    class: Class;               // The specific class this meeting belongs to

    @OneToMany(() => Comment, comment => comment.meeting)
    comments?: Comment[];
}