
import { Module } from "@nestjs/common";
import { AddressRepository } from "./addrtess.repository.js";
import { AddressService } from "./address.service.js";
import { AddressPort } from "../Users/Adapter/addressPort.js";
import { UserAddressAdapter } from "./Adapter/user-address.adapter.js";
import { ViaCepHttpGateway } from "./infra/cep-client.infra.js";
import { AddressGateway } from "./Adapter/cep-address-gateway.adapter.js";
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AddressController } from "./address.controller.js";
import { GetAddressByCepUseCase } from "./use-cases/cep-address.use-cases.js";

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    AddressRepository,
    AddressService,
    GetAddressByCepUseCase,
    { provide: AddressPort, useClass: UserAddressAdapter },  
  {provide: AddressGateway, useClass:ViaCepHttpGateway  },
  ],
   controllers: [AddressController],
  exports: [AddressPort],
})
export class AddressModule {}