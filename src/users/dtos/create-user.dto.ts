// src/users/dtos/create-user.dto.ts
// DTO for creating a new user (used in admin endpoints)

import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;

  @ApiProperty({ example: 'user', enum: ['user', 'admin'] })
  @IsEnum(['user', 'admin'], { message: 'Role must be either user or admin' })
  role!: string;
}
