// src/auth/dtos/login.dto.ts
// DTO for user login

import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}
