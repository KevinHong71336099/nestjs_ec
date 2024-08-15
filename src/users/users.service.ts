import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindUserQueryDto } from './dto/find-user-query';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // CRUD操作
  async create(createUserDto: CreateUserDto): Promise<User> {
    // 驗證email存在
    await this.confirmEmail(createUserDto.email);

    // 驗證密碼輸入
    this.confirmpPassword(
      createUserDto.password,
      createUserDto.confirmPassword,
    );

    // 建立新使用者
    const encryptedPwd: string = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: encryptedPwd,
    });
    return await this.usersRepository.save(newUser);
  }

  async findByQuery(query: FindUserQueryDto): Promise<User[]> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    this.applyOrderBy(queryBuilder, query.orderBy);
    queryBuilder
      .where('user.name like :name', { name: `%${query.name}%` })
      .andWhere('user.email like :email', { email: `%${query.email}%` })
      .andWhere('user.role = :role', { role: query.role })
      .skip((query.page - 1) * query.limit)
      .take(query.limit);
    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException(`找不到id:${id}的使用者`);
    }
    return foundUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException(`找不到id:${id}的使用者`);
    }
    Object.assign(foundUser, updateUserDto);
    const updatedUser = await this.usersRepository.save(foundUser);
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException(`找不到id:${id}的使用者`);
    }
    await this.usersRepository.delete(id);
    return foundUser;
  }

  // Utility
  private confirmpPassword(password: string, confirmPassword: string): void {
    if (password.localeCompare(confirmPassword) !== 0) {
      throw new BadRequestException('密碼驗證未通過');
    }
  }

  private async confirmEmail(email: string): Promise<void> {
    const exist = await this.usersRepository.existsBy({ email });
    if (exist) {
      throw new ConflictException('該信箱已被註冊，請使用用其他信箱。');
    }
  }

  private applyOrderBy(
    queryBuilder: SelectQueryBuilder<User>,
    orderBy?: string,
  ) {
    if (!orderBy) return;
    const orderByParams = orderBy.split(',').map((param) => param.trim());
    orderByParams.forEach((param) => {
      const [field, direction] = param.split(':');
      queryBuilder.addOrderBy(`user.${field}`, direction as 'ASC' | 'DESC');
    });
  }
}
