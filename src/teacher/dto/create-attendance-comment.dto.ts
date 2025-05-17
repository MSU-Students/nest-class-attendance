import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAttendanceCommentDto {
    @ApiProperty({ description: 'Comment content (e.g., "present", "absent", or any attendance note)' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: 'Meeting ID that this attendance comment belongs to' })
    @IsNumber()
    meetingId: number;

    @ApiProperty({ description: 'Student ID (User ID) that this attendance is for' })
    @IsNumber()
    studentId: number;

    @ApiProperty({ description: 'Creation date (optional, defaults to current date)' })
    @IsOptional()
    createdAt?: Date;
}
