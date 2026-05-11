// src/config/mongodb.config.ts
// This file exports the MongoDB connection configuration using environment variables

export const mongodbConfig = () => ({
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nestjs-app',
});
