# Setup Instructions for NestJS Backend Project

This document provides step-by-step instructions to get your NestJS backend project up and running.

## Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher)
- npm (comes with Node.js)
- MongoDB (local or cloud)

## Step 1: Install Dependencies

```bash
npm install
```

The following packages will be installed:
- `@nestjs/common` - NestJS core
- `@nestjs/platform-express` - HTTP server
- `@nestjs/mongoose` - MongoDB integration
- `@nestjs/jwt` - JWT authentication
- `@nestjs/passport` - Passport strategies
- `@nestjs/swagger` - API documentation
- `mongoose` - MongoDB ODM
- `passport-jwt` - JWT strategy
- `bcryptjs` - Password hashing
- `class-validator` - DTO validation
- `class-transformer` - DTO transformation
- `dotenv` - Environment variables

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and configure:
```env
MONGODB_URI=mongodb://localhost:27017/nestjs-app
JWT_SECRET=change_this_to_a_secure_random_string_in_production
JWT_EXPIRATION=24h
NODE_ENV=development
PORT=3000
```

## Step 3: Ensure MongoDB is Running

### Option A: Local MongoDB

**Start MongoDB:**
```bash
# Linux
sudo systemctl start mongodb

# macOS
brew services start mongodb-community

# Windows
# Run mongod.exe from MongoDB installation folder
```

**Verify it's running:**
```bash
mongosh
```

### Option B: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string from Connect button
4. Update `MONGODB_URI` in `.env` with your connection string

## Step 4: Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript.

## Step 5: Run the Application

### Development Mode (Recommended)
```bash
npm run start:dev
```

This starts the server in watch mode. Any file changes will automatically reload the server.

### Production Mode
```bash
npm run build
npm run start:prod
```

## Step 6: Test the API

Once the server is running, you should see:
```
🚀 Application is running on: http://localhost:3000
📚 Swagger documentation available at: http://localhost:3000/api
```

### Health Check
```bash
curl http://localhost:3000
```

Expected response:
```json
{
  "message": "NestJS Backend is running!"
}
```

### Access Swagger UI
Open your browser and go to: `http://localhost:3000/api`

## Step 7: Create Your First User (Register)

### Using cURL:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Or use Swagger UI:
1. Go to `http://localhost:3000/api`
2. Find the `Auth` section
3. Click on `POST /auth/register`
4. Click "Try it out"
5. Fill in the request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
6. Click "Execute"

You'll get a response with `accessToken` and user data.

## Step 8: Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Copy the `accessToken` from the response.

## Step 9: Access Protected Routes

### Get Your Profile
```bash
curl -X GET http://localhost:3000/users/profile/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Replace `YOUR_TOKEN_HERE` with the token you got from login.

## Project Structure Explained

```
src/
├── auth/              # Registration & login
├── users/             # User management
├── roles/             # Role configuration
├── common/            # Shared guards, decorators, filters
├── config/            # Configuration files
├── app.module.ts      # Main module
└── main.ts            # Application entry point
```

## Common Issues & Solutions

### Issue: Connection refused to MongoDB
**Solution:** Ensure MongoDB is running and `MONGODB_URI` in `.env` is correct

### Issue: Port 3000 already in use
**Solution:** Change PORT in `.env` to another port (e.g., 3001)

### Issue: Token errors
**Solution:** Make sure token is passed in Authorization header: `Bearer <token>`

### Issue: Validation errors
**Solution:** Check that DTOs match the expected format (see README.md for examples)

## Useful Commands

```bash
# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod

# Run tests
npm run test

# Run tests with coverage
npm run test:cov
```

## API Features Overview

- ✅ User registration and login
- ✅ JWT token authentication
- ✅ Role-based access control (Admin & User)
- ✅ User profile management
- ✅ Admin user management
- ✅ Input validation with DTOs
- ✅ Error handling with custom filters
- ✅ MongoDB database integration
- ✅ Swagger API documentation

## Next Steps

1. Review the README.md for detailed API documentation
2. Explore the Swagger UI at `http://localhost:3000/api`
3. Test the endpoints using Swagger or cURL
4. Study the code structure in the `src/` folder
5. Customize and extend the application as needed

## Getting Help

- NestJS Docs: https://docs.nestjs.com
- JWT: https://jwt.io
- MongoDB: https://docs.mongodb.com
- Mongoose: https://mongoosejs.com

---

**Happy coding! 🚀**
