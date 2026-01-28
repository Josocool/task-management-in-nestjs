import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  ParseUUIDPipe,
  Logger,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
//import type { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
//import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private readonly logger = new Logger(TasksController.name);
  constructor(private tasksService: TasksService) {}

  // ເຂົ້າເຖິງຂໍ້ມູນທັງໝົດ  Restful API (CRUD)
  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }
  // @Get() // ລືມບັນທັດນີ້ຕອນແລກຂໍ້ມູນເລີຍບໍ່ອອກ
  // getTaskAll(): Promise<Task[]> {
  //   return this.tasksService.getTaskAll();
  // }

  // ເຂົ້າເຖິງຂໍ້ມູນຕາມ id, Read data by filter id  Restful API (CRUD)
  @Get('/:id')
  getTaskById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  // ສ້າງຂໍ້ມູນໃໝ່, Create  Restful API (CRUD)
  @Post()
  createTask(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  // recalling delete async function
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  // ອັບເດດສະຖານະຂອງຂໍ້ມູນຕາມເລກໄອດີ (Patch), Restful API (CRUD) [ Patch ໃຊ້ແກ້ຂໍ້ມູນບາງສ່ວນ, Put ໃຊ້ແກ້ຂໍ້ມູນຊຸດ ]
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    @GetUser()
    user: User,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    this.logger.log(`Updating task ID ${id} with status ${status}`);
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
