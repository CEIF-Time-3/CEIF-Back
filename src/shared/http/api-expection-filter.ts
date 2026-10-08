import { ArgumentsHost, ExceptionFilter, HttpException,Catch, Injectable } from "@nestjs/common";
import type { Response } from 'express';

const DEFAULT_CODES: Record<number, string> = {
  400: 'BAD_REQUEST', 401: 'UNAUTHORIZED', 403: 'FORBIDDEN',
  404: 'NOT_FOUND', 409: 'CONFLICT', 429: 'TOO_MANY_REQUESTS',
};

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    
    const res = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const body = exception.getResponse();
    
    const normalized =
      typeof body === 'object' && body !== null && 'code' in body
        ? body                                             
        : {
            statusCode: status,
            code: DEFAULT_CODES[status] ?? 'HTTP_ERROR',
            message: typeof body === 'string' ? body : (body as any).message,
          };

    res.status(status).json(normalized);
  }
}