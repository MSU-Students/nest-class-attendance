import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService], // Optional: only if you want to use it in other modules
})
export class RolesModule {}
