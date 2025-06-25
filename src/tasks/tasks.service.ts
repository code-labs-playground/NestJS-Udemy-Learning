import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task[] {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return this.tasks;
  }

  deleteTask(id: string): Task[] {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks;
  }

  updateTask(
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
  ): Task | undefined {
    const task = this.getTaskById(id);
    if (task) {
      if (title) task.title = title;
      if (description) task.description = description;
      if (status) task.status = status;
      return task;
    }
    return undefined;
  }
}
