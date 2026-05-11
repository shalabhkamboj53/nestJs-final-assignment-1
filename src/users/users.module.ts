// src/users/users.module.ts
// Users Module - bundles users controller and service

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';

const JWT_EXPIRATION: number | StringValue =
  (process.env.JWT_EXPIRATION as StringValue | undefined) || '24h';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRATION,
      },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export service for use in other modules (like Auth)
})
export class UsersModule {}
