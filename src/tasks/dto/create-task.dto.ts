import { IsNotEmpty } from 'class-validator'; // ໃຊ້ເພື່ອກວດສອບຄວາມບໍ່ຖືກຕ້ອງຕອນທົດສອບຍິງຂໍ້ມູນຜ່ານ Postman

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
  // title: string;
  // description: string;
}
