import { Module } from "@nestjs/common";
import { PolicyModule } from "../Policy/policy.module.js";
import { UsersController } from "./users.controller.js";
import { UsersService } from "./users.service.js";
import { UsersRepository } from "./users.repository.js";
import { AdminCreateUserUseCase } from "./use-cases/admin-create-user.use-cases.js";
import { CreateUserGuestUseCase } from "./use-cases/create-user-guest.use-cases.js";
import { AddressModule } from "../Address/address.module.js";

@Module({imports:[PolicyModule,AddressModule],controllers:[UsersController], providers:[UsersService,UsersRepository,AdminCreateUserUseCase,CreateUserGuestUseCase],
exports:[UsersService,UsersRepository]
})
export class UsersModule{}