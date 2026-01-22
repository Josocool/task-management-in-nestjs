import { IsString, MaxLength, MinLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  // ສ່ວນກຳນົດໃຫ້ password ຈຳເປັນຕ້ອງມີ ອັກສອນໃຫ່ຍ ແລະ ນ້ອຍ ແລະ ຕົວເລກຕາມມາດຕະຖານການຕັ້ງລະຫັດຜ່ານ
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
