import {
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER (task.description) LIKE LOWER( :search)',
        { search: `%${search}%` },
      );
    }
    //console.log(filterDto);
    return await query.getMany();
  }

  //Read to Information by filter Id (CRUD)
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  // Create to Task
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    try {
      return await this.tasksRepository.save(task);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Failed to create task', error.stack);
      } else {
        this.logger.error('Failed to create task: unknown error');
      }
      throw new InternalServerErrorException();
    }
  }

  // Delete to Information by filter Id (CRUD)
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({ id });
    this.logger.log(`Deleted task with ID "${id}"`);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    this.logger.log(`Delete Task with ID "${id}"`);
  }

  // Update to Information by filter Id (CRUD)
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    try {
      await this.tasksRepository.save(task);
      this.logger.log(`Updated task ID "${task.id}" status to ${task.status}`);
      return task;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Failed to Update task', error.stack);
      } else {
        this.logger.error('Failed to update task: unknown error');
      }
      throw new InternalServerErrorException();
    }
  }
}
