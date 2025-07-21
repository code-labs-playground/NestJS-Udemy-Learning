import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentials;

    const user = this.create({
      username,
      password,
    });

    try {
      await this.save(user);
    } catch (error) {
      // Type guard to safely check if error has a code property
      if (error && typeof error === 'object' && 'code' in error) {
        const typedError = error as { code: string };
        if (typedError.code === '23505') {
          throw new ConflictException('Username already exists');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
