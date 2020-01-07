import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signUp(username, password) {
    console.log(username, password);
  }

  signIn(username, password) {
    console.log(username, password);
  }
}
