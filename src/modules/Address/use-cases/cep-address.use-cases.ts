// src/address/application/use-cases/get-address-by-cep.use-case.ts
import { Injectable } from '@nestjs/common';


import { AddressApiError } from '../Http/address-http-erros.js';
import { AddressGateway,ExternalAddressEntity } from '../Adapter/cep-address-gateway.adapter.js';
import { CepUtils } from '../utils/cep-utils.js';
import { Result } from '../../../shared/types/result.js';

@Injectable()
export class GetAddressByCepUseCase {
  constructor(private readonly addressGateway: AddressGateway) {}

  async execute(cepInput: string): Promise<Result<ExternalAddressEntity, AddressApiError>> {
    const cleanCep = CepUtils.sanitize(cepInput);

    if (!CepUtils.isValid(cleanCep)) {
      return { success: false, message: 'INVALID_CEP' };
    }

    try {
      const address = await this.addressGateway.findByCep(cleanCep);

      if (!address) {
        return { success: false, message: 'CEP_NOT_FOUND' };
      }

      return { success: true, data: address };
    } catch (error) {
      return { success: false, message: 'EXTERNAL_SERVICE_ERROR' };
    }
  }
}