import { ApiProperty } from '@nestjs/swagger';

export class CreateClassesDto {
    @ApiProperty()
    className: string;
    @ApiProperty()
    classSchedule: Date;
   
}