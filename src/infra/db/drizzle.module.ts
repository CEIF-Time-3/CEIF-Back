import { Global, Module } from '@nestjs/common';
import { DrizzleDB, drizzleProvider } from './drizzle.provider.js';

@Global()
@Module({
  providers: [drizzleProvider],
  exports: [DrizzleDB],
})
export class DatabaseModule {}