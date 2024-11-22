import { IsNotEmpty, IsString } from "class-validator";

export class Auth {

    @IsNotEmpty()
    userName:string;

    @IsString()
    userPassword:string;
}
