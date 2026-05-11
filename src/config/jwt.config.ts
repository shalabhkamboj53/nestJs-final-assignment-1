// src/config/jwt.config.ts
// This file exports the JWT configuration for authentication

export const jwtConfig = () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRATION || '24h',
});
