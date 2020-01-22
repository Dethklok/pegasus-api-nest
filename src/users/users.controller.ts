import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 201, description: 'The user successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad request. Invalid data in DTO.'})
  @ApiResponse({ status: 409, description: 'Username already exists.'})
  @Post()
  createUser(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return null;
  }
}
