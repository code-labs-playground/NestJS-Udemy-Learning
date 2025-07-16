import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRepository]), // Importing the TasksRepository (Using Dependency Injection to access the repository in the service)
  ],
  exports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
