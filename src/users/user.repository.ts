import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { PostgresqlErrorCodes } from '../constants/postgresql-error-codes';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await this.hashPassword(createUserDto.password, salt);

    const user = this.create({
      ...createUserDto,
      password,
      salt,
    });

    try {
      await user.save();

      return user;
    } catch (error) {
      if (error.code === PostgresqlErrorCodes.PG_UNIQUE_VIOLATION) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private hashPassword(password, salt): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
