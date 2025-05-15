import { Classes } from 'src/classes/entities/classes.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    Fname?: string;

    @Column({ length: 255 })
    Lname: string;

    @Column({ length: 10 })
    Age?: string;

    @Column({ length: 100 })
    Address?: string;

    @Column({ length: 50 })
    Phone?: string;

    @OneToMany(() => Classes, classes => classes.teacher)
    classes: Classes[];

    @OneToOne(() => User, user => user.teacher, { cascade: true })
    @JoinColumn({ name: 'userId'})
    user?: User;
}

