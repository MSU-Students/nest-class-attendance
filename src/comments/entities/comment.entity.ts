import { Meeting } from "src/meetings/entities/meeting.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    createdAt: Date;

    @ManyToOne(() => Meeting, meeting => meeting.comments, { cascade: true })
    meeting: Meeting[];

    @ManyToOne(() => User, user => user.comments, { cascade: true })
    user?: User[];
}
