import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserData } from '../users/interfaces/user-data.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<UserData> {
    return this.authService.login(authCredentialsDto);
  }
}
