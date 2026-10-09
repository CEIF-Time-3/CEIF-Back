import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object' && 'success' in data) {
          if (data.success) {
            return {
              success: true,
              data: data.data,
            };
          } else {
            response.status(400);
            return {
              success: false,
              message: data.error || data.message,
            };
          }
        }

        return {
          success: true,
          data: data,
        };
      }),
      
    
        catchError((error) => {
        
        if (error instanceof HttpException) {
          return throwError(() => error);
        }
        const status = 500;
        const message = error?.message || 'Internal server error';

        response.status(status);
        return throwError(() => ({
          success: false,
          message: Array.isArray(message) ? message[0] : message,
        }));
      }),
    );
  }
}
