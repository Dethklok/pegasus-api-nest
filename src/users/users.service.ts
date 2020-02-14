import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPublicData } from './interfaces/user-public-data.interface';
import { User } from './user.entity';

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

  findOne(input: string | number): Promise<User> {
    let user = null;

    if (this.isId(input)) {
      user = this.userRepository.findOne({ id: input });
    }

    if (this.isUsername(input)) {
      user = this.userRepository.findOne({ username: input });
    }

    if (this.isEmail(input)) {
      user = this.userRepository.findOne({ email: input });
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async validateUser(username: string, password: string): Promise<UserPublicData> {
    const user = await this.findOne(username);

    if (await !user.validatePassword(password)) {
      throw new UnauthorizedException();
    }

    return user.getPublicData();
  }

  async getUserPublicData(input: string | number): Promise<UserPublicData> {
    const user = await this.findOne(input);

    return user.getPublicData();
  }

  // Private
  private isEmail(x: any): x is string {
    return typeof x === 'string' && /@/.test(x);
  }

  private isId(x: any): x is number {
    return typeof x === 'number';
  }

  private isUsername(x: any): x is string {
    return typeof x === 'string' && !/@/.test(x);
  }
}
