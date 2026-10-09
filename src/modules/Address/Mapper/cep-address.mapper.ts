// src/address/infrastructure/mappers/external-address.mapper.ts
import { ExternalAddressEntity } from '../Adapter/cep-address-gateway.adapter.js';
import { ExternalAddressResponseDto } from '../DTO/address-cep-response.dto.js';


export class ExternalAddressMapper {
  static toResponse(externalData: ExternalAddressEntity): ExternalAddressResponseDto {
    return {
      zipCode: externalData.cep.replace(/\D/g, ''),
      street: externalData.logradouro,
      complement: externalData.complemento || '',
      neighborhood: externalData.bairro,
      city: externalData.localidade,
      state: externalData.uf,
    };
  }
}