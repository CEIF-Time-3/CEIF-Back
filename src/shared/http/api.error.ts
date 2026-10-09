// shared/http/api-error.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export interface FieldError { field: string; messages: string[] }

export interface ApiErrorBody {
  statusCode: number;
  code: string;          // estável: é o que o front usa para decidir
  message: string;       // legível: pode mudar ou ser traduzida
  errors?: FieldError[]; // só em VALIDATION_ERROR
}

export interface ErrorSpec { status: HttpStatus; message: string }

export function toHttpException<E extends string>(
  table: Record<E, ErrorSpec>,
  code: E,
): HttpException {
  const { status, message } = table[code];

  const body: ApiErrorBody = { statusCode: status, code, message };
 
  const exception =  new HttpException(body, status);
  console.log('Exception criada é instância de HttpException?', exception instanceof HttpException);
  console.log('Conteúdo da exceção:', exception);
  return exception
}