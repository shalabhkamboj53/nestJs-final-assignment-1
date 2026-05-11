// src/users/users.service.ts
// Users Service - handles all user-related business logic

import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Helper method to format user response (exclude password)
  private formatUserResponse(user: UserDocument): UserResponseDto {
    const userObj = user.toObject() as any;
    const { password, ...rest } = userObj;
    return rest as UserResponseDto;
  }

  // Create a new user (used by admin)
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create and save the new user
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    await user.save();
    return this.formatUserResponse(user);
  }

  // Find user by email (used for authentication)
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  // Find user by ID
  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.formatUserResponse(user);
  }

  // Get all users (admin only)
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find();
    return users.map((user) => this.formatUserResponse(user));
  }

  // Update user information
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    // Check if new email is already used by another user
    if (updateUserDto.email) {
      const existingUser = await this.userModel.findOne({
        email: updateUserDto.email,
        _id: { $ne: id },
      });
      if (existingUser) {
        throw new BadRequestException('This email is already in use');
      }
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.formatUserResponse(user);
  }

  // Delete user
  async delete(id: string): Promise<{ message: string }> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }
}
