import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);


import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from './jwt.service';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
      const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
      if (isPublic) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header missing');
      }
  
      const [type, token] = authHeader.split(' ');
      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid token format');
      }
  
      try {
        const payload = this.jwtService.verify(token);
        request.user = payload;
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  