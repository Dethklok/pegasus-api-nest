import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    minLength: 4,
    maxLength: 20,
  })
  readonly username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password too weak' },
  )
  @ApiProperty({
    minLength: 8,
    maxLength: 50,
    description: 'Must contain numbers and uppercase and lowercase letters',
  })
  readonly password: string;

  @IsEmail()
  @ApiProperty()
  readonly email: string;
}
