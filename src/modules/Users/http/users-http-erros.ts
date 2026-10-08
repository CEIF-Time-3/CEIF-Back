// users/http/users-http-errors.ts
import { HttpStatus } from '@nestjs/common';
import type { ErrorSpec } from '../../../shared/http/api.error.js';
import type { AuthorizeActorError, PersistUserError } from '../Error/users.error.js';

export type UserApiError = AuthorizeActorError | PersistUserError;

export const USER_ERRORS = {
  INVALID_ACTOR:        { status: HttpStatus.UNAUTHORIZED, message: 'Autenticação necessária' },
  FORBIDDEN:            { status: HttpStatus.FORBIDDEN,    message: 'Sem permissão para esta ação' },
  EMAIL_ALREADY_IN_USE: { status: HttpStatus.CONFLICT,     message: 'Este e-mail já está cadastrado' },
} satisfies Record<UserApiError, ErrorSpec>;