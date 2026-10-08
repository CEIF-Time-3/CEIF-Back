
import { Module } from "@nestjs/common";
import { AddressRepository } from "./addrtess.repository.js";
import { AddressService } from "./address.service.js";
import { AddressPort } from "../Users/Adapter/addressPort.js";
import { UserAddressAdapter } from "./Adapter/user-address.adapter.js";
@Module({
  providers: [
    AddressRepository,
    AddressService,
    { provide: AddressPort, useClass: UserAddressAdapter },  
  ],
  exports: [AddressPort],
})
export class AddressModule {}