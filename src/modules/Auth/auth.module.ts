// auth/auth.module.ts
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller.js";
import { UsersModule } from "../Users/users.module.js";

@Module({
  imports: [

  ],
  controllers:[AuthController],
  providers: [],
  exports: [],           
})
export class AuthModule {}