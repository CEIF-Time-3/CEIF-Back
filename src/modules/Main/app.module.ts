import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from '../Products/products.module.js';
import { CategoriesModule } from '../Categories/categories.module.js';
import { DatabaseModule } from '../../infra/db/drizzle.module.js';
import { ConfigModule } from '@nestjs/config';
import { PolicyModule } from '../Policy/policy.module.js';
import { UsersModule } from '../Users/users.module.js';
import { AuthModule } from '../Auth/auth.module.js';
import { AddressModule } from '../Address/address.module.js';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    ProductsModule, CategoriesModule, DatabaseModule,PolicyModule,UsersModule,AuthModule,AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
