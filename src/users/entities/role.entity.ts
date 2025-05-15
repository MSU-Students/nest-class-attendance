import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: 'admin' | 'student' | 'teacher' | 'supervisor';

    @Column({ default: 'active' })
    status: 'active' | 'inactive' | 'disable';

    @ManyToOne(() => User, user => user.roles)
    //user: User;
    user?: User;  // Add "?" to make it optional
}
