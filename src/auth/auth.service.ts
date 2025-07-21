import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    await this.usersRepository.createUser(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentials;
    const user = await this.usersRepository.findOne({ where: { username } });

    if (
      user &&
      (await this.usersRepository.comparePasswords(password, user.password))
    ) {
      return 'Login successful';
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
