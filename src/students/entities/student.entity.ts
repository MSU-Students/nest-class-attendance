import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    StudentId: number;

    @Column()
    name: string;

    @Column()
    contactInfo: string;
    
    @CreateDateColumn()
    enrollmentDate: Date;
}