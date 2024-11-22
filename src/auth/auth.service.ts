import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(createAuthDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUserName(createAuthDto.userName);
    // if (user?.userPassword !== createAuthDto.userPassword) {
    //   throw new UnauthorizedException();
    // }

    const isPassvalid=bcrypt.compare(user.userPassword, createAuthDto.userPassword)
    if(!isPassvalid)
    {
      throw new UnauthorizedException();
    }


    const payload = { userName: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
