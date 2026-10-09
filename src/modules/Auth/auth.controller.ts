import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { CreateUserGuestUseCase } from "../Users/use-cases/create-user-guest.use-cases.js";
import { CreateUserWithAddressesDto } from "../Users/DTO/create-user-with-address.dto.js";
import { UserMapper } from "../Users/Mapper/users.mapper.js";
@Controller('Auth')
export class AuthController{
      constructor() {}

}