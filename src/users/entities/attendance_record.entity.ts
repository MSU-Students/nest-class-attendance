import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('attendance_records')
export class AttendanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.attendances, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  status: 'present' | 'absent' | 'late';

  @Column({ type: 'datetime' })
  checkInTime: Date;

  @Column({ type: 'datetime', nullable: true })
  checkOutTime: Date;

  @Column({ nullable: true })
  remarks: string;

  @Column({ type: 'varchar', length: 50 })
  classSection: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
