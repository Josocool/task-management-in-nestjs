import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // // ເຂົ້າເຖິງຂໍ້ມູນທັງໝົດ  Restful API (CRUD)
  // @Get()
  // getTasks(@Query() fitlerDto: GetTasksFilterDto): Task[] {
  //   //if we have any filters defined, call tasksService.getTasksWilFilters
  //   // otherwise, just get all tasks
  //   if (Object.keys(fitlerDto).length) {
  //     // ... do something right that
  //     return this.tasksService.getTasksWithFilter(fitlerDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // // ເຂົ້າເຖິງຂໍ້ມູນຕາມ id, Read data by filter id  Restful API (CRUD)
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // // ສ້າງຂໍ້ມູນໃໝ່, Create  Restful API (CRUD)
  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(CreateTaskDto);
  }

  // // ລົບຂໍ້ມູນຕາມເລກໄອດີ , Delete Restful API (CRUD)
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.tasksService.deleteTask(id);
  // }
  // // ອັບເດດສະຖານະຂອງຂໍ້ມູນຕາມເລກໄອດີ (Patch), Restful API (CRUD) [ Patch ໃຊ້ແກ້ຂໍ້ມູນບາງສ່ວນ, Put ໃຊ້ແກ້ຂໍ້ມູນຊຸດ ]
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
