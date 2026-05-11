// src/auth/auth.module.ts
// Auth Module - bundles auth controller, service, and JWT configuration

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '24h';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production',
      signOptions: { 
        expiresIn: JWT_EXPIRATION,
      } as any,
    }),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
