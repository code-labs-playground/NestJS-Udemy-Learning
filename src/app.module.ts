import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available
      envFilePath: [`.env.stage.${process.env.STAGE}`], // Load environment variables from .env file
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access environment variables
      inject: [ConfigService], // Inject ConfigService to access configuration
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE') as 'postgres', // Database type
          host: configService.get('DB_HOST') ?? 'localhost', // Database host
          port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10), // Database port
          username: configService.get('DB_USERNAME'), // Database username
          password: configService.get('DB_PASSWORD'), // Database password
          database: configService.get<string>('DB_DATABASE'), // Database name
          autoLoadEntities: true, // Automatically load entities from imported modules
          synchronize: true, // Note: Set to false in production
        };
      },
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
