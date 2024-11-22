import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
      
    @IsNotEmpty()
    readonly userName: string;

    @IsString()
    userPassword: string;
}
