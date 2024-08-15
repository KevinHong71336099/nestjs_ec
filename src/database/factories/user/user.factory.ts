import { User } from '../../../users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

export default setSeederFactory(User, async (faker) => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email();
  user.role = Math.random() > 0.5 ? 'admin' : 'guest';
  user.password = await bcrypt.hash('123', 10);
  return user;
});
