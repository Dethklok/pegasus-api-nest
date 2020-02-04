import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiConflictResponse, ApiOkResponse,
  ApiNotFoundResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDataLessenedInterface } from './interfaces/userDataLessened.interface';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ description: 'User successfully created.'})
  @ApiBadRequestResponse({ description: 'Bad request. Invalid data in DTO.' })
  @ApiConflictResponse({ description: 'Username already exists' })
  @Post()
  createUser(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOkResponse({ description: 'Successfully find user data.'})
  @ApiBadRequestResponse({ description: 'Bad request params.'})
  @ApiNotFoundResponse({ description: 'User not found.'})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDataLessenedInterface> {
    return null;
  }
}
