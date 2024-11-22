//export class CreateAuthDto {}


import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class CreateAuthDto {
    
    @IsNotEmpty()
    readonly userName: string;

    @IsString()
    userPassword: string;
  }
  
