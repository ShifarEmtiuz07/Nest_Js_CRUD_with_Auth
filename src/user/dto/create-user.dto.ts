
import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    readonly userName: string;

    @IsEmail()
    @IsString()
    readonly userEmail: string;

    @IsString()
    userPassword: string;
    
  @IsString()
  @IsOptional()
  userNewPassword:string;

  }
  