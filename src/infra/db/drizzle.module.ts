import { Global, Module } from '@nestjs/common';
import { DrizzleDB, drizzleProvider } from './drizzle.provider.js';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [drizzleProvider, ConfigService],
  exports: [DrizzleDB],
})
export class DatabaseModule {}
