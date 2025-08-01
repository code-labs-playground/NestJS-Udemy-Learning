import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: configService.get<string>('JWT_EXPIRES_IN')
          ? { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
          : undefined,
      }),
    }),
    TypeOrmModule.forFeature([User]), // Import the User entity
  ],
  providers: [AuthService, UsersRepository, JwtStrategy], // Add UsersRepository as a provider
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule], // Export JwtStrategy and PassportModule for use in other modules
})
export class AuthModule {}
