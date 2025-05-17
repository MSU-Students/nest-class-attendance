import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    username: string;

    @ApiProperty({minLength: 6})
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ enum: ['admin', 'student', 'teacher', 'supervisor'], description: 'User role type' })
    @IsEnum(['admin', 'student', 'teacher', 'supervisor'])
    role: 'admin' | 'student' | 'teacher' | 'supervisor';

    @ApiProperty({ enum: ['active', 'inactive', 'disable'], default: 'active', required: false })
    @IsEnum(['active', 'inactive', 'disable'])
    @IsOptional()
    roleStatus?: 'active' | 'inactive' | 'disable' = 'active';

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

}
