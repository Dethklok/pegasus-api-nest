import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserPublicData } from '../users/interfaces/user-public-data.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async signin(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    const userPublicData: UserPublicData = await this.usersService.validateUser(username, password);
    const jwtPayload = this.getJwtPayload(userPublicData);

    return this.jwtService.sign(jwtPayload);
  }

  async signup(createUserDto: CreateUserDto): Promise<string> {
    const user = await this.usersService.createUser(createUserDto);
    const jwtPayload = this.getJwtPayload(user.getPublicData());

    return this.jwtService.sign(jwtPayload);
  }

  private getJwtPayload(userPublicData: UserPublicData): JwtPayload {
    return {
      username: userPublicData.username,
      email: userPublicData.email,
    };
  }
}
