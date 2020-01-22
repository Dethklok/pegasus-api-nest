import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDataLessenedInterface } from './interfaces/userDataLessened.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
  }

  createUser(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  async findOne(id: number): Promise<UserDataLessenedInterface> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { username } = user;

    return { username };
  }
}
