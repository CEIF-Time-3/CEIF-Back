
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser,AuthenticatedRequest } from '../types/auth.types.js';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser | undefined =>
    ctx.switchToHttp().getRequest<AuthenticatedRequest>().user,
);