import { IsNotEmpty, IsString } from "class-validator";

export class Auth {

    @IsNotEmpty()
    userId:number;

    @IsString()
    userPassword:string;
}
