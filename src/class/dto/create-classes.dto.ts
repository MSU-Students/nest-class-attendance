import { ApiProperty } from '@nestjs/swagger';

export class CreateClassesDto {
    @ApiProperty()
    className: string;

    @ApiProperty()
    classSection: string;

    @ApiProperty()
    classSchedule: Date;

    @ApiProperty({ description: 'ID of the teacher creating this class' })
    teacherId: number;
}