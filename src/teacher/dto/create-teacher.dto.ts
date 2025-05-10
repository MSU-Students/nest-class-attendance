
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
    @ApiProperty()
    Fname: string;
    @ApiProperty()
    Lname: string;
    @ApiProperty()
    Age: string;
    @ApiProperty()
    Address: string;
    @ApiProperty()
    Phone: string;
}
