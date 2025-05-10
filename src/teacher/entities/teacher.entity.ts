import { Classes } from 'src/classes/entities/classes.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    Fname: string;

    @Column({ length: 255 })
    Lname: string;

    @Column({ length: 10 })
    Age: string;

    @Column({ length: 100 })
    Address: string;

    @Column({ length: 50 })
    Phone: string;
    
    @OneToMany(() => Classes, classes => classes.teacher)
    classes: Classes[];

}

