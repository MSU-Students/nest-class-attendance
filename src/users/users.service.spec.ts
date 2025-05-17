import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { CreateUserDto } from './dto/create-user.dto';

jest.mock('./entities/user.entity', () => ({
  User: class User {}
}));

jest.mock('./entities/role.entity', () => ({
  Role: class Role {}
}));

import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

describe('UsersService', () => {
  let service: UsersService;
  let rolesService: RolesService;
  let userRepo: any;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
  };

  const mockRoleRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockRolesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByUserId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    rolesService = module.get<RolesService>(RolesService);
    userRepo = mockUserRepository;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user with a role', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'password123',
        role: 'teacher',
        roleStatus: 'active',
      };

      const savedUser = {
        id: 1,
        username: 'testuser',
        password: 'password123',
      };

      const userWithRoles = {
        id: 1,
        username: 'testuser',
        password: 'password123',
        roles: [
          {
            id: 1,
            type: 'teacher',
            status: 'active',
            user: { id: 1 },
          },
        ],
      };

      userRepo.save.mockResolvedValue(savedUser);
      mockRolesService.create.mockResolvedValue({
        id: 1,
        type: 'teacher',
        status: 'active',
        user: savedUser,
      });
      userRepo.findOne.mockResolvedValue(userWithRoles);

      const result = await service.create(createUserDto);

      expect(userRepo.save).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
      expect(mockRolesService.create).toHaveBeenCalledWith({
        type: 'teacher',
        userId: 1,
        status: 'active',
      });
      expect(result).toEqual(userWithRoles);
    });
  });
});
