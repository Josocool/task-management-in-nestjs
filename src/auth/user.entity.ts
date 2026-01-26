import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username']) // ກຳນົດໃຫ້ ຂໍ້ມູນ username ທີ່ signup ມາຕ້ອງຫ້າມມີຄ່າຊ້ຳກັນ
export class User {
  // ເອີ້ນໃຊ້ Library ແລະ Method ຂອງ TypeORM ມາສ້າງຂໍ້ມູນລົງໃນ Database
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // ສ້າງຄໍລ້ຳໃໝ່ Autp ດ້ວຍ typeORM ກ່ອນສ້າງຕ້ອງລະບູແບບນີ້ທຸກຄັ້ງ
  username: string;
  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
