import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' },
  ];

  getAllTasks() {
    return this.tasks;
  }
}
