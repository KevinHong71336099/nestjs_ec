import { Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

enum RoleType {
  ADMIN = 'admin',
  GUEST = 'guest',
}

export class FindUserQueryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  orderBy: string;

  @IsOptional()
  @IsString()
  @IsIn([RoleType.ADMIN, RoleType.GUEST], { message: '角色只能為admin, guest' })
  role: string;

  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  page: number;

  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  limit: number;
}
