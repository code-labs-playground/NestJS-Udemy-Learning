import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import the User entity
  ],
  providers: [AuthService, UsersRepository], // Add UsersRepository as a provider
  controllers: [AuthController],
})
export class AuthModule {}
