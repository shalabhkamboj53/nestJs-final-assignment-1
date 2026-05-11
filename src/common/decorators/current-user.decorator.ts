// src/common/decorators/current-user.decorator.ts
// Custom decorator to extract the current user from the request

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Record<string, unknown>;
  }
}

export const CurrentUser = createParamDecorator(
  (
    _data: unknown,
    ctx: ExecutionContext,
  ): Record<string, unknown> | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user;
  },
);
