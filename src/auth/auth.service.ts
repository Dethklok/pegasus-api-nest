import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserPublicData } from '../users/interfaces/user-public-data.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    const userPublicData: UserPublicData = await this.usersService.validateUser(username, password);
    const jwtPayload: JwtPayload = {
      username: userPublicData.username,
      email: userPublicData.email,
    };

    return this.jwtService.sign(jwtPayload);
  }
}
