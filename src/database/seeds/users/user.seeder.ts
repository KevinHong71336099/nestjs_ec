import { User } from '../../../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<User[]> {
    const userFactory = await factoryManager.get(User);
    return await userFactory.saveMany(10);
  }
}
