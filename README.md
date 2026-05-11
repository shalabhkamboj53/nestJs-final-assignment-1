# NestJS Backend API - Beginner-Friendly Project

A production-ready but beginner-friendly backend API built with NestJS and TypeScript. This project demonstrates clean modular architecture, JWT authentication, role-based access control, MongoDB integration, and comprehensive API documentation using Swagger.

## 📚 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Example API Requests](#example-api-requests)
- [Database Setup](#database-setup)
- [Error Handling](#error-handling)
- [Development Tips](#development-tips)

## ✨ Features

### Core Features
- ✅ **JWT Authentication** - Secure user authentication with JWT tokens
- ✅ **Role-Based Access Control (RBAC)** - Admin and User roles with route protection
- ✅ **MongoDB Integration** - Using Mongoose for database operations
- ✅ **Input Validation** - Using class-validator and class-transformer
- ✅ **Swagger Documentation** - Interactive API documentation
- ✅ **Global Error Handling** - Standardized error responses
- ✅ **Password Security** - Bcrypt hashing for password security
- ✅ **Modular Architecture** - Clean separation of concerns

### API Features
- User registration and login
- User profile management
- Admin user management
- Protected routes with JWT
- Role-based route protection
- Comprehensive API documentation

## 🏗️ Project Structure

```
src/
├── auth/                          # Authentication module
│   ├── dtos/
│   │   ├── register.dto.ts       # User registration DTO
│   │   ├── login.dto.ts          # User login DTO
│   │   └── auth-response.dto.ts  # JWT response DTO
│   ├── auth.controller.ts        # Auth endpoints
│   ├── auth.service.ts           # Auth business logic
│   └── auth.module.ts            # Auth module definition
│
├── users/                         # Users module
│   ├── dtos/
│   │   ├── create-user.dto.ts    # Create user DTO
│   │   ├── update-user.dto.ts    # Update user DTO
│   │   └── user-response.dto.ts  # User response DTO
│   ├── schemas/
│   │   └── user.schema.ts        # MongoDB User schema
│   ├── users.controller.ts       # User endpoints
│   ├── users.service.ts          # User business logic
│   └── users.module.ts           # Users module definition
│
├── roles/                         # Roles module
│   └── roles.module.ts           # Roles configuration
│
├── common/                        # Shared utilities and guards
│   ├── decorators/
│   │   ├── roles.decorator.ts    # @Roles() decorator
│   │   └── current-user.decorator.ts  # @CurrentUser() decorator
│   ├── filters/
│   │   └── http-exception.filter.ts   # Global exception filter
│   ├── guards/
│   │   ├── jwt-auth.guard.ts     # JWT authentication guard
│   │   └── roles.guard.ts        # Role-based access guard
│   └── exceptions/
│       └── http.exception.ts     # Custom HTTP exceptions
│
├── config/                        # Configuration files
│   ├── mongodb.config.ts         # MongoDB connection config
│   └── jwt.config.ts             # JWT configuration
│
├── app.module.ts                 # Root application module
├── app.controller.ts             # Root controller
├── app.service.ts                # Root service
└── main.ts                       # Application entry point

.env                              # Environment variables
.env.example                      # Environment variables template
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Steps

1. **Clone or navigate to the project**
```bash
cd /home/appinventiv/Documents/nodeJS/nestJS/pro3
```

2. **Install dependencies**
```bash
npm install
```

Dependencies installed:
- `@nestjs/common` - NestJS core
- `@nestjs/platform-express` - Express adapter
- `@nestjs/mongoose` - MongoDB integration
- `@nestjs/jwt` - JWT authentication
- `@nestjs/passport` - Passport authentication strategies
- `@nestjs/swagger` - API documentation
- `mongoose` - MongoDB ODM
- `passport-jwt` - JWT strategy for Passport
- `bcryptjs` - Password hashing
- `class-validator` - DTO validation
- `class-transformer` - DTO transformation

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

**`.env` file contents:**

```env
# MongoDB Configuration
# Use local MongoDB: mongodb://localhost:27017/nestjs-app
# Use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database-name
MONGODB_URI=mongodb://localhost:27017/nestjs-app

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRATION=24h

# Application Configuration
NODE_ENV=development
PORT=3000
```

### Important Notes:
- **JWT_SECRET**: Change this to a secure random string in production
- **MONGODB_URI**: Update with your MongoDB connection string
- **JWT_EXPIRATION**: Token expiration time (e.g., '24h', '7d', '30d')

## 🏃 Running the Application

### Development Mode
```bash
# Watch mode - auto-reload on file changes
npm run start:dev
```

### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Testing
```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Test with coverage
npm run test:cov
```

## 📡 API Endpoints

### Health Check
- `GET /` - Check if API is running

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Users (Protected Routes)
- `GET /users/profile/me` - Get current user profile
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user information
- `POST /users` - Create new user (Admin only)
- `GET /users` - Get all users (Admin only)
- `DELETE /users/:id` - Delete user (Admin only)

## 🔐 Authentication

### How JWT Works

1. **User Registration/Login** → Server generates JWT token
2. **Client stores token** → Usually in localStorage or cookies
3. **Client sends token** → In Authorization header: `Bearer <token>`
4. **Server validates token** → Decodes and verifies signature
5. **Request proceeds** → If token is valid

### Getting JWT Token

**Register and get token:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Using JWT Token

**Add to Authorization header:**
```bash
curl -X GET http://localhost:3000/users/profile/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 👥 Authorization

### Role-Based Access Control (RBAC)

Two roles are implemented:

#### **User Role**
- Can view their own profile
- Can update their own profile
- Cannot access other users' data
- Cannot access admin endpoints

#### **Admin Role**
- Can view all users
- Can create new users
- Can update any user
- Can delete users
- Has access to all protected routes

### Route Protection Examples

**Public endpoint:**
```typescript
@Get()
getHello(): { message: string }
```

**Protected (requires authentication):**
```typescript
@Get('profile/me')
@UseGuards(JwtAuthGuard)
getProfile(@CurrentUser() user: any)
```

**Protected with role:**
```typescript
@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
create(@Body() createUserDto: CreateUserDto)
```

## 📋 Example API Requests

### 1. Health Check
```bash
curl http://localhost:3000/
```

**Response (200):**
```json
{
  "message": "NestJS Backend is running!"
}
```

### 2. User Registration
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "SecurePass123"
  }'
```

**Response (201):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "user"
  }
}
```

### 3. User Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "SecurePass123"
  }'
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "user"
  }
}
```

### 4. Get Current User Profile
```bash
curl -X GET http://localhost:3000/users/profile/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "role": "user",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 5. Update User Profile
```bash
curl -X PUT http://localhost:3000/users/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Updated",
    "email": "alice.updated@example.com"
  }'
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Alice Updated",
  "email": "alice.updated@example.com",
  "role": "user",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

### 6. Get All Users (Admin Only)
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Bob Smith",
    "email": "bob@example.com",
    "role": "admin",
    "isActive": true,
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
]
```

### 7. Validation Error Example
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "invalid-email",
    "password": "123"
  }'
```

**Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "email must be an email",
    "Password must be at least 6 characters"
  ],
  "statusCode": 400
}
```

## 🗄️ Database Setup

### Local MongoDB

**1. Install MongoDB:**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community
```

**2. Start MongoDB:**
```bash
# Linux
sudo systemctl start mongodb

# macOS
brew services start mongodb-community

# Windows
# Use MongoDB as a service or run: mongod
```

**3. Verify MongoDB is running:**
```bash
mongosh
# or
mongo
```

### MongoDB Atlas (Cloud)

1. **Create an account** at https://www.mongodb.com/cloud/atlas
2. **Create a cluster**
3. **Get connection string**
4. **Update .env:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

## ❌ Error Handling

The API returns standardized JSON error responses:

### Common Errors

**401 Unauthorized** - No or invalid token:
```json
{
  "success": false,
  "message": "No authorization token provided",
  "statusCode": 401
}
```

**403 Forbidden** - Insufficient permissions:
```json
{
  "success": false,
  "message": "Access denied. Required role: admin",
  "statusCode": 403
}
```

**404 Not Found** - Resource doesn't exist:
```json
{
  "success": false,
  "message": "User not found",
  "statusCode": 404
}
```

**400 Bad Request** - Validation errors:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "email must be an email",
    "password must be at least 6 characters"
  ],
  "statusCode": 400
}
```

## 💡 Development Tips

### Adding New DTOs
```typescript
// src/users/dtos/new-feature.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewFeatureDto {
  @ApiProperty({ example: 'example' })
  @IsString()
  field: string;
}
```

### Creating Custom Guards
```typescript
// src/common/guards/custom.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CustomGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Your logic here
    return true;
  }
}
```

### Creating Custom Decorators
```typescript
// src/common/decorators/custom.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // Your logic here
    return request;
  },
);
```

## 🧪 Testing

### Create Unit Test
```typescript
// src/auth/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

## 📖 Swagger UI

Access the interactive API documentation at:
```
http://localhost:3000/api
```

You can:
- View all endpoints
- See request/response schemas
- Test endpoints directly
- Copy code examples

## 🔄 Workflow Example

1. **Register** → POST /auth/register → Get JWT token
2. **Login** → POST /auth/login → Get JWT token
3. **Access Protected Route** → GET /users/profile/me with token
4. **Update Profile** → PUT /users/:id with token
5. **Logout** → Client removes token (no backend logout needed)

## 📚 Further Learning

- [NestJS Documentation](https://docs.nestjs.com)
- [MongoDB with Mongoose](https://mongoosejs.com)
- [JWT Authentication](https://jwt.io)
- [Passport.js](http://www.passportjs.org)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

**Happy coding! 🚀**
