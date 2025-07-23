import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Register the Task entity, not the repository
    AuthModule, // Import AuthModule to use authentication features
  ],
  exports: [],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository], // Add TasksRepository as a provider
})
export class TasksModule {}
