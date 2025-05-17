import { PartialType } from '@nestjs/swagger';
import { 
  IsString, 
  IsEmail, 
  IsOptional, 
  IsInt, 
  Min, 
  Max, 
  IsBoolean,
  IsNotEmpty,
  MaxLength
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiPropertyOptional({
    description: 'Student first name',
    example: 'Maria',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Student last name',
    example: 'Clara',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Valid university email',
    example: 'm.clara@university.edu',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Current academic year (1-5)',
    example: 2,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  yearLevel?: number;

  @ApiPropertyOptional({
    description: 'Academic program name',
    example: 'Computer Science',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  academicProgram?: string;
  
  @ApiPropertyOptional({
    description: 'Account active status',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// For PATCH operations
export class UpdateStudentProfileDto extends PartialType(UpdateStudentDto) {}
