import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('signin')
  signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signin(authCredentialsDto);
  }

  @Post('signup')
  signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<string> {
    return this.authService.signup(createUserDto);
  }
}
