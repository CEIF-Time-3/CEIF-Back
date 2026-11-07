import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UsersService } from './users.service.js';
import { UsersRepository } from './users.repository.js';
import { fail, ok } from '../../shared/helpers/result.helper.js';
import { IUserDto } from './DTO/user-dto.js';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockUsersRepository = {
    findActorById: vi.fn(),
    findAll: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);

    vi.clearAllMocks();
  });

  describe('ensureAdmin', () => {
    it('deve retornar fail("INVALID_ACTOR") se o actorId não for fornecido', async () => {
      const result = await service.ensureAdmin(undefined);

      expect(result).toEqual(fail('INVALID_ACTOR'));
      expect(repository.findActorById).not.toHaveBeenCalled();
    });

    it('deve retornar fail("INVALID_ACTOR") se o usuário não for encontrado', async () => {
      mockUsersRepository.findActorById.mockResolvedValue(null);

      const result = await service.ensureAdmin('id-123');

      expect(result).toEqual(fail('INVALID_ACTOR'));
    });

    it('deve retornar fail("INVALID_ACTOR") se o usuário for encontrado, mas estiver inativo', async () => {
      mockUsersRepository.findActorById.mockResolvedValue({
        isActive: false,
        role: 'admin',
      });

      const result = await service.ensureAdmin('id-123');

      expect(result).toEqual(fail('INVALID_ACTOR'));
    });

    it('deve retornar fail("FORBIDDEN") se o usuário estiver ativo, mas não for admin', async () => {
      mockUsersRepository.findActorById.mockResolvedValue({
        isActive: true,
        role: 'user',
      });

      const result = await service.ensureAdmin('id-123');

      expect(result).toEqual(fail('FORBIDDEN'));
    });

    it('deve retornar ok(true) se o usuário for admin e estiver ativo', async () => {
      mockUsersRepository.findActorById.mockResolvedValue({
        isActive: true,
        role: 'admin',
      });

      const result = await service.ensureAdmin('id-123');

      expect(result).toEqual(ok(true));
    });
  });

  describe('getAll', () => {
    it('deve chamar o findAll do repositório e retornar os dados', async () => {
      const mockUsers: IUserDto[] = [
        {
          id: '1',
          name: 'John',
          email: 'john@test.com',
          phone: null,
          role: 'admin',
          isActive: true,
        },
      ];

      mockUsersRepository.findAll.mockResolvedValue(mockUsers);

      const result = await service.getAll();

      expect(repository.findAll).toHaveBeenCalledOnce();

      expect(result).toEqual({ success: true, data: mockUsers });
    });

    it('Deve retornar uma falha caso o repository lance um erro', async () => {
      mockUsersRepository.findAll.mockRejectedValue(
        new Error('Db connection lost'),
      );

      const result = await service.getAll();

      expect(repository.findAll).toHaveBeenCalledOnce();

      expect(result).toEqual(fail('Erro interno no servidor.'));
    });
  });
});
