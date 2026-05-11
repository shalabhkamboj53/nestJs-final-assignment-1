// src/auth/dtos/auth-response.dto.ts
// DTO for authentication response (contains JWT token)

import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({
    example: {
      _id: '507f1f77bcf86cd799439011',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
    },
  })
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}
