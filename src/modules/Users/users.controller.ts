import { Controller, Get } from '@nestjs/common';

import { type AuthUser } from '../Auth/types/auth.types.js';
import { CurrentUser } from '../Auth/Decorators/current-user.decorators.js';
import { UseGuards, Body, Post } from '@nestjs/common';

import { AdminCreateUserUseCase } from './use-cases/admin-create-user.use-cases.js';
import { AdminCreateUserDto } from './DTO/admin-create-user.dto.js';
import { UserMapper } from './Mapper/users.mapper.js';
import { OptionalAuthGuard } from '../Policy/Guards/optional-auth-guard.js';
import { CreateUserGuestUseCase } from './use-cases/create-user-guest.use-cases.js';
import { CreateUserWithAddressesDto } from './DTO/create-user-with-address.dto.js';
import { toHttpException } from '../../shared/http/api.error.js';
import { USER_ERRORS } from './http/users-http-erros.js';
import { UsersService } from './users.service.js';
import {
  ApiCreateUser,
  ApiGetAllUsers,
  ApiRegisterUser,
} from './docs/users-swagger.decorator.js';

@Controller('users')
export class UsersController {
  constructor(
    private readonly adminCreateUser: AdminCreateUserUseCase,
    private readonly createUserGuest: CreateUserGuestUseCase,
    private readonly userService: UsersService,
  ) {}

  @ApiCreateUser()
  @UseGuards(OptionalAuthGuard)
  @Post()
  async create(
    @Body() dto: AdminCreateUserDto,
    @CurrentUser() actor?: AuthUser,
  ) {
    const result = await this.adminCreateUser.execute(dto, actor?.id);

    if (!result.success) throw toHttpException(USER_ERRORS, result.message);
    return UserMapper.toResponse(result.data);
  }

  @ApiRegisterUser()
  @Post('register')
  async register(@Body() dto: CreateUserWithAddressesDto) {
    const result = await this.createUserGuest.execute(dto);

    if (!result.success) throw toHttpException(USER_ERRORS, result.message);
    return UserMapper.toPublicResponse(result.data);
  }

  @ApiGetAllUsers()
  @UseGuards(OptionalAuthGuard)
  @Get()
  async getAll() {
    const result = await this.userService.getAll();

    if (!result.success) throw toHttpException(USER_ERRORS, result.message);
    return result.data;
  }
}
