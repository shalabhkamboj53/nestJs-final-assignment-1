// src/config/jwt.config.ts
// This file exports the JWT configuration for authentication

export const jwtConfig = () => ({
  secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production',
  expiresIn: process.env.JWT_EXPIRATION || '24h',
});
