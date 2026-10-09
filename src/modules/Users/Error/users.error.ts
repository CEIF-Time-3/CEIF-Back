// users/errors/users.errors.ts
export type AuthorizeActorError = 'INVALID_ACTOR' | 'FORBIDDEN';
export type PersistUserError = 'EMAIL_ALREADY_IN_USE';
export type ResolveRoleError = 'FORBIDDEN_ROLE' | 'INVALID_ACTOR';
export type CreateUserError = ResolveRoleError | PersistUserError;