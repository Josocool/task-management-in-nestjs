import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  // ຟັງຊັນ createTask ບໍ່ຈຳເປັນຕ້ອງສ້າງໃໝ່ ຖ້າ servcie ໃຊ້ repository.create + save
  // ເຮົາບໍ່ຕ້ອງຂຽນ createTask ໃນ repository ແລ້ວ ເພາະ  ເພາະ tasks.service ເຮັດທັ້ງໝົດໄດ້ເລີຍ
}
