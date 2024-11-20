import { IsString } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  readonly userName: string;

  @IsString()
  readonly userEmail: string;

  @IsString()
  readonly userPassword: string;

  @IsString()
  userNewPassword:string;


}
