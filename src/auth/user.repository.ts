import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(registrationCredentialsDto: RegistrationCredentialsDto): Promise<void> {
    const { username, password, email } = registrationCredentialsDto;

    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password, salt): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
