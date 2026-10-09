
import type { Request } from 'express';

// auth/auth.types.ts
export interface AuthUser {
  id: string;
}

export interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}