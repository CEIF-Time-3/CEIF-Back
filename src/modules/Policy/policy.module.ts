
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { OptionalAuthGuard } from "./Guards/optional-auth-guard.js";
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },      
      }),
    }),
  ],
  providers: [OptionalAuthGuard],
  exports: [OptionalAuthGuard, JwtModule],           
})
export class PolicyModule {}