import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserData } from '../users/interfaces/user-data.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<UserData> {
    const { username, password } = authCredentialsDto;

    const user = await this.usersService.findOne(username);

    if (user && user.validatePassword(password)) {

    }

    return null;
  }
}
