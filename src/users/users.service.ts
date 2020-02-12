import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserPublicData } from './interfaces/user-public-data.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
  }

  createUser(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      return null;
    }

    return user;
  }

  async getUserData(id: number): Promise<UserPublicData> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.getPublicData();
  }
}
