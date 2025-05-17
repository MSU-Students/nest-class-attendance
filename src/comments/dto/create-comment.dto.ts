import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ description: 'Comment content (e.g., "present", "absent", or any attendance note)' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: 'Meeting ID that this comment belongs to' })
    @IsNumber()
    meetingId: number;

    @ApiProperty({ description: 'User ID of the commenter (optional, can be determined from auth token)' })
    @IsNumber()
    @IsOptional()
    userId?: number;

    @ApiProperty({ description: 'Creation date (optional, defaults to current date)' })
    @IsOptional()
    createdAt?: Date;
}
