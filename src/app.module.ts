import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'psql',
      database: 'task-management', // Database name
      autoLoadEntities: true, // Automatically load entities from imported modules
      synchronize: true, // Note: Set to false in production
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
