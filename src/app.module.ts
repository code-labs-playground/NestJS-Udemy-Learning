import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     type: 'postgres',
    //     host: process.env.DB_HOST,
    //     port: parseInt(process.env.DB_PORT, 10) || 5432,
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_DATABASE,
    //   }),
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
