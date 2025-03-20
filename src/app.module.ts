import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ringer.db',
      entities: [User],
      synchronize: true, // Auto-create database schema (for development only)
    }),
    UserModule,
  ],
})
export class AppModule {}
