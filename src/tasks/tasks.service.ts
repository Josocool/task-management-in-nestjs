import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  // function GetTasksFilterDto
  getTasks(fitlerDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(fitlerDto);
  }

  // // Read to Information (CRUD)
  async getTaskAll(): Promise<Task[]> {
    // TypeORM will return array task
    return await this.tasksRepository.find();
  }

  //Read to Information by filter Id (CRUD)
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  // // Create to Information (CRUD)
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return this.tasksRepository.save(task);
  }

  // // Delete to Information by filter Id (CRUD)
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({ id });
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
  // // Read to Information (CRUD)
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // // check if id protected value to undefined, Read to Information by filter Id (CRUD)
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found `);
  //     //throw new Error('Task not found');
  //   }
  //   return found;
  // }

  // // Delete to Information by filter Id (CRUD)
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // // Update to Information by filter Id (CRUD)
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    console.log(task);
    return task;
  }
}
