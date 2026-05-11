// src/users/users.module.ts
// Users Module - bundles users controller and service

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';

const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '24h';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        'your_super_secret_jwt_key_change_this_in_production',
      signOptions: {
        expiresIn: JWT_EXPIRATION,
      } as any,
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export service for use in other modules (like Auth)
})
export class UsersModule {}
