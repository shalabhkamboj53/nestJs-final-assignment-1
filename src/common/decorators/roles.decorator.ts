// src/common/decorators/roles.decorator.ts
// Custom decorator to specify required roles for a route

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
