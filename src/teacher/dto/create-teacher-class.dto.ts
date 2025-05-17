import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherClassDto {
    @ApiProperty()
    className: string;

    @ApiProperty()
    classSection: string;

    @ApiProperty()
    classSchedule: Date;
}
