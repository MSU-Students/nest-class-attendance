import { Classes } from "src/classes/entities/classes.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;
    
    @Column()
    createdAt: Date;

    @OneToMany(() => Comment, comment => comment.meeting)
    comments: Comment[];

    @ManyToOne(() => Classes, classes => classes.meetings)
    classes: Classes[];
}
 