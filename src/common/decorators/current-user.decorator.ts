// src/common/decorators/current-user.decorator.ts
// Custom decorator to extract the current user from the request

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.user;
});
