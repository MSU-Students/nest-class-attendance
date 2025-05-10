import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classes } from './entities/classes.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Classes])],
  controllers: [ClassesController],
  providers: [ClassesService]
})
export class ClassesModule {}
