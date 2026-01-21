import { IsNotEmpty, IsString } from 'class-validator'; // ໃຊ້ເພື່ອກວດສອບຄວາມບໍ່ຖືກຕ້ອງຕອນທົດສອບຍິງຂໍ້ມູນຜ່ານ Postman

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  // title: string;
  // description: string;
}
