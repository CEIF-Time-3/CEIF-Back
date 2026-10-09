// src/modules/Address/use-cases/get-address-by-cep.use-case.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { AddressGateway } from '../Adapter/cep-address-gateway.adapter.js';
import { GetAddressByCepUseCase } from './cep-address.use-cases.js';


describe('GetAddressByCepUseCase', () => {
  let useCase: GetAddressByCepUseCase;
  let addressGateway: AddressGateway; // ou AddressGateway tipado como mock do vitest

  beforeEach(() => {
    // Criando o mock usando o vi.fn() do Vitest
    addressGateway = {
      findByCep: vi.fn(),
    };

    useCase = new GetAddressByCepUseCase(addressGateway);
  });

  it('deve retornar com sucesso os dados do endereço quando o CEP for válido e existir', async () => {
    const mockExternalAddress = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
    };

    addressGateway.findByCep.mockResolvedValue(mockExternalAddress);

    const result = await useCase.execute('01001000');

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(mockExternalAddress);
    }
    expect(addressGateway.findByCep).toHaveBeenCalledWith('01001000');
  });

  it('deve retornar erro INVALID_CEP se o formato do CEP for inválido', async () => {
    const result = await useCase.execute('123'); // Menos de 8 dígitos

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.message).toBe('INVALID_CEP');
    }
    expect(addressGateway.findByCep).not.toHaveBeenCalled();
  });

  it('deve retornar erro CEP_NOT_FOUND se o gateway externo retornar nulo', async () => {
    addressGateway.findByCep.mockResolvedValue(null);

    const result = await useCase.execute('99999999');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.message).toBe('CEP_NOT_FOUND');
    }
  });

  it('deve retornar erro EXTERNAL_SERVICE_ERROR se o gateway lançar uma exceção', async () => {
    addressGateway.findByCep.mockRejectedValue(new Error('Network Error'));

    const result = await useCase.execute('01001000');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.message).toBe('EXTERNAL_SERVICE_ERROR');
    }
  });
});