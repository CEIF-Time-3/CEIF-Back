// src/address/infrastructure/gateways/viacep-http.gateway.ts
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AddressGateway,ExternalAddressEntity } from '../Adapter/cep-address-gateway.adapter.js';

@Injectable()
export class ViaCepHttpGateway implements AddressGateway {

  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('VIA_CEP_URL') || 'https://viacep.com.br/ws';
  }

  async findByCep(cleanCep: string): Promise<ExternalAddressEntity | null> {
    try {
      const url = `${this.baseUrl}/${cleanCep}/json/`;
      const response = await firstValueFrom(this.httpService.get<any>(url));

      if (response.data && response.data.erro) {
        return null;
      }

      return response.data;
    } catch (error) {
      throw new Error('EXTERNAL_SERVICE_ERROR');
    }
  }
}