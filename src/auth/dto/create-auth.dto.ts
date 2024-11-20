//export class CreateAuthDto {}


import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class CreateAuthDto {
    
    @IsNotEmpty()
    readonly userId: number;

    @IsString()
    userPassword: string;
  }
  
