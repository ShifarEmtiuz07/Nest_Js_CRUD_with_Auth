import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async signAsync(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  verify(token: string): any {
    return this.jwtService.verify(token);
  }
}
