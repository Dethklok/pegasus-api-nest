import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(authCredentialsDto: AuthCredentialsDto) {
    const user = await this.authService.validateUser(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
