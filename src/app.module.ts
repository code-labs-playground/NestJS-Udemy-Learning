import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available
      envFilePath: ['.env'], // Load environment variables from .env file
    }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres', // Database type
      host: process.env.DB_HOST ?? 'localhost', // Database host
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // Database port
      username: process.env.DB_USERNAME, // Database username
      password: process.env.DB_PASSWORD, // Database password
      database: process.env.DB_DATABASE, // Database name
      autoLoadEntities: true, // Automatically load entities from imported modules
      synchronize: true, // Note: Set to false in production
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
