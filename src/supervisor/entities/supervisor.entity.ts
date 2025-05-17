import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Supervisor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  employeeId: string;           // University-assigned ID (e.g., "SUP-2023-001")

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  department: string;

  // Relations
  @OneToOne(() => User, user => user.supervisor) // One-to-one with User
  user: User;
}