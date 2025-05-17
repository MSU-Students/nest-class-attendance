import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { role, roleStatus, ...userData } = createUserDto;

    const user = await this.userRepo.save(userData);

    const createRoleDto: CreateRoleDto = {
      type: role,
      userId: user.id,
      status: roleStatus || 'active',
    };
    await this.rolesService.create(createRoleDto);

    return this.findOne(user.id);
  }

  findAll() {
    return this.userRepo.find({
      relations: ['roles']
    });
  }

  async findOne(id: number) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['roles']
    });
  }
  async findOneByUsername(username: string) {
    return this.userRepo.findOne({
      where: { username },
      relations: ['roles']
    });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async assignRole(userId: number, roleId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const roles = await this.rolesService.findByUserId(roleId);
    if (user && roles?.length) {
      user.roles = roles;
      return this.userRepo.save(user);
    }
    return null;
  }
}
