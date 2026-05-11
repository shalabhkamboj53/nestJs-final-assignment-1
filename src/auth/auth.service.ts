// src/auth/auth.service.ts
// Auth Service - handles authentication logic (register, login, token generation)

import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Register a new user
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Create the user using the UsersService
    // Note: We cast the response to include password temporarily for login logic
    const user = await this.usersService.create({
      ...registerDto,
      role: 'user', // New users are assigned 'user' role
    });

    // Generate JWT token
    const accessToken = this.generateToken(user._id, user.role);

    // Return response without password
    return {
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // Login user with email and password
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Find user by email
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const userId = user._id ? user._id.toString() : user.email;
    const accessToken = this.generateToken(userId, user.role);

    // Return response
    return {
      accessToken,
      user: {
        _id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // Helper method to generate JWT token
  private generateToken(userId: string, role: string): string {
    const payload = {
      sub: userId, // 'sub' is standard JWT claim for subject (user ID)
      role,
    };

    return this.jwtService.sign(payload);
  }
}
