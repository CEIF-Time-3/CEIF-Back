// src/address/http/address.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { GetAddressByCepUseCase } from './use-cases/cep-address.use-cases.js';
import { ADDRESS_ERRORS } from './Http/address-http-erros.js';
import { toHttpException } from '../../shared/http/api.error.js';
import { AddressMapper } from './Mapper/address.mapper.js';
import { ExternalAddressMapper } from './Mapper/cep-address.mapper.js';


@Controller('addresses')
export class AddressController {
  constructor(private readonly getAddressByCepUseCase: GetAddressByCepUseCase) {}

  @Get(':cep')
  async getByCep(@Param('cep') cep: string) {
    const result = await this.getAddressByCepUseCase.execute(cep);

    if (!result.success) {
      throw toHttpException(ADDRESS_ERRORS, result.message);
    }

     return ExternalAddressMapper.toResponse(result.data);
  }
}