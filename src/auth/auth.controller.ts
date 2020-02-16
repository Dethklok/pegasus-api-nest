import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiConflictResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiCreatedResponse({ description: 'Token successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request. Invalid data in DTO.' })
  @ApiUnauthorizedResponse({ description: 'Credentials incorrect.' })
  @Post('signin')
  signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signin(authCredentialsDto);
  }

  @ApiCreatedResponse({ description: 'User and token successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request. Invalid data in DTO.' })
  @ApiConflictResponse({ description: 'Username already exists.' })
  @Post('signup')
  signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<string> {
    return this.authService.signup(createUserDto);
  }
}
