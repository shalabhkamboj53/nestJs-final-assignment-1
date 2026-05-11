// src/auth/auth.module.ts
// Auth Module - bundles auth controller, service, and JWT configuration

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '24h';
const JWT_SECRET =
  process.env.JWT_SECRET ||
  'your_super_secret_jwt_key_change_this_in_production';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRATION as StringValue,
      },
    }),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
