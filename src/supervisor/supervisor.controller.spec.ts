import { Test, TestingModule } from '@nestjs/testing';
import { SupervisorController } from './supervisor.controller';
import { SupervisorService } from './supervisor.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

describe('SupervisorController', () => {
  let controller: SupervisorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupervisorController],
      providers: [SupervisorService],
    }).compile();

    controller = module.get<SupervisorController>(SupervisorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
