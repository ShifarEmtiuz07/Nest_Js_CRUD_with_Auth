import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CheckLoginMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    // Check if the Authorization header is present
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    // Extract token from header
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      // Verify the token using your secret key
      const secretKey ='nabxxhsbchyasbfhavbsvb';  //process.env.JWT_SECRET ||
      const decoded = jwt.verify(token, secretKey);

      // Attach the decoded user to the request for later use
      req.user = decoded;

      next(); // Continue to the next middleware or controller
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
