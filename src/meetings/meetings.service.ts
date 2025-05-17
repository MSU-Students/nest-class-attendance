import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) {}

  create(createMeetingDto: CreateMeetingDto) {
    return this.meetingRepository.save(createMeetingDto);
  }

  findAll() {
    return this.meetingRepository.find;
  }

  findOne(id: number, p0?: { relations: string[]; }) {
    return this.meetingRepository.findBy({id});
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return this.meetingRepository.update(id, updateMeetingDto);
  }

  remove(id: number) {
    return this.meetingRepository.delete(id);
  }
}
