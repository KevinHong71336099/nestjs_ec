import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

enum RoleType {
  ADMIN = 'admin',
  GUEST = 'guest',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '名稱欄位不能為空' })
  @MinLength(2, { message: '名稱太短，需要2個字以上' })
  @MaxLength(30, { message: '名稱太長，需要30個字以下' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'name 只能包含字母和數字，且不能包含空格',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: '信箱欄位不能為空' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '密碼欄位不能為空' })
  @Length(8, 20)
  password: string;

  @IsString()
  @IsNotEmpty({ message: '驗證密碼欄位不能為空' })
  @Length(8, 20)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty({ message: '角色欄位不能為空' })
  @IsIn([RoleType.ADMIN, RoleType.GUEST], { message: '角色只能為admin, guest' })
  role: string;
}
