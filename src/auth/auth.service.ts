import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {
  }

  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersService.findOne(username);

    if (user && await user.validatePassword(password)) {
      return user;
    }

    return null;
  }
}
