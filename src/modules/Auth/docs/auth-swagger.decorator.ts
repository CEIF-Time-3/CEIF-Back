import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Autentica o usuário e retorna o token de acesso (JWT)',
    }),
    ApiResponse({
      status: 200,
      description: 'Login realizado com sucesso. Retorna o token de acesso e dados do usuário.',
      schema: {
        example: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: 'e8e19d7a-1234-4567-8901-abcdef123456',
            name: 'Administrador do Sistema',
            email: 'admin@ceif.com',
            role: 'admin',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Dados da requisição inválidos (e.g. e-mail inválido ou senha curta).',
    }),
    ApiResponse({
      status: 401,
      description: 'Credenciais inválidas (e-mail ou senha incorretos).',
    }),
  );
}

export function ApiGetProfile() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna as informações pessoais do usuário autenticado (/me)',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: 'Dados do perfil do usuário autenticado retornados com sucesso.',
      schema: {
        example: {
          id: 'e8e19d7a-1234-4567-8901-abcdef123456',
          name: 'Maria Silva',
          email: 'cliente1@ceif.com',
          phone: '85999990003',
          role: 'customer',
          isActive: true,
          createdAt: '2026-11-18T10:00:00.000Z',
          updatedAt: '2026-11-18T10:00:00.000Z',
          addresses: [
            {
              id: 'a1b2c3d4-5678-90ef-ghij-1234567890ab',
              zipCode: '60000000',
              street: 'Rua Principal',
              number: '123',
              complement: 'Apto 101',
              neighborhood: 'Centro',
              city: 'Fortaleza',
              state: 'CE',
              createdAt: '2026-11-18T10:00:00.000Z',
              updatedAt: '2026-11-18T10:00:00.000Z',
            },
          ],
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Não autorizado (token JWT ausente ou inválido).',
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário não encontrado.',
    }),
  );
}
