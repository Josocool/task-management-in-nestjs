import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task, TasksStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // ເຂົ້າເຖິງຂໍ້ມູນທັງໝົດ  Restful API (CRUD)
  @Get()
  getAllTaskk(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // ເຂົ້າເຖິງຂໍ້ມູນຕາມ id, Read data by filter id  Restful API (CRUD)
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // ສ້າງຂໍ້ມູນໃໝ່, Create  Restful API (CRUD)
  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(CreateTaskDto);
  }

  // ລົບຂໍ້ມູນຕາມເລກໄອດີ , Delete Restful API (CRUD)
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }
  // ອັບເດດສະຖານະຂອງຂໍ້ມູນຕາມເລກໄອດີ (Patch), Restful API (CRUD) [ Patch ໃຊ້ແກ້ຂໍ້ມູນບາງສ່ວນ, Put ໃຊ້ແກ້ຂໍ້ມູນຊຸດ ]
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TasksStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
