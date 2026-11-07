import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Cria um novo usuário (Admin)' }),
    ApiBearerAuth(),
    ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' }),
    ApiResponse({ status: 400, description: 'Dados inválidos.' }),
    ApiResponse({ status: 403, description: 'Ação não permitida.' }),
  );
}

export function ApiRegisterUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registra um novo usuário com endereço (Visitante)',
    }),
    ApiResponse({
      status: 201,
      description: 'Registro realizado com sucesso.',
    }),
    ApiResponse({ status: 400, description: 'Dados inválidos.' }),
  );
}

export function ApiGetAllUsers() {
  return applyDecorators(
    ApiOperation({ summary: 'Lista todos os usuários' }),
    ApiBearerAuth(),
    ApiResponse({ status: 200, description: 'Lista de usuários retornada.' }),
    ApiResponse({ status: 401, description: 'Não autorizado.' }),
  );
}
