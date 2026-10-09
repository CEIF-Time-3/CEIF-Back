// src/address/http/address-http-errors.ts
import { HttpStatus } from '@nestjs/common';
import type { ErrorSpec } from '../../../shared/http/api.error.js';

export type AddressApiError = 'INVALID_CEP' | 'CEP_NOT_FOUND' | 'EXTERNAL_SERVICE_ERROR';

export const ADDRESS_ERRORS = {
  INVALID_CEP:             { status: HttpStatus.BAD_REQUEST,         message: 'O CEP informado é inválido. Deve conter 8 dígitos numéricos.' },
  CEP_NOT_FOUND:           { status: HttpStatus.NOT_FOUND,           message: 'Endereço não encontrado para o CEP informado.' },
  EXTERNAL_SERVICE_ERROR:  { status: HttpStatus.SERVICE_UNAVAILABLE, message: 'Erro ao consultar o serviço de CEP. Tente novamente mais tarde.' },
} satisfies Record<AddressApiError, ErrorSpec>;