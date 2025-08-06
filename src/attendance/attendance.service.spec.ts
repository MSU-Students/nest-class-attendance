import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';

const mockAttendanceRepository = {
  // mock methods as needed, e.g.:
  find: jest.fn(),
  save: jest.fn(),
};

describe('AttendanceService', () => {
  let service: AttendanceService;
  let repo: Repository<Attendance>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendanceService,{
          provide: getRepositoryToken(Attendance),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },]
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
    repo = module.get<Repository<Attendance>>(getRepositoryToken(Attendance));
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
