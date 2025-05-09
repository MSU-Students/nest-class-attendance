import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Classes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    className: string;

    @Column({ })
    classSchedule: Date;

      @OneToMany(() => Meeting, meeting => meeting.classes)
      meetings: Meeting[];
}