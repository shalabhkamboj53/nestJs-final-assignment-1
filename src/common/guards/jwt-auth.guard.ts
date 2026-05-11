// src/common/guards/jwt-auth.guard.ts
// JWT Authentication Guard - protects routes that require authentication

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Extract token from Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No authorization token provided');
    }

    // Token should be in format "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      // Verify and decode the JWT token
      const payload = await this.jwtService.verifyAsync(token);
      // Attach the decoded payload to the request object for later use
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
