import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  signUp(username, password) {
    console.log(username, password);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    return 'done';
  }
}
