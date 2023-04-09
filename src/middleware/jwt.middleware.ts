import { NestMiddleware, ForbiddenException, Inject } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

export class JwtMiddleware implements NestMiddleware {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) throw new ForbiddenException();

    const headerToken: string = req.headers['authorization'];
    const token = headerToken.split('Bearer ')[1];

    if (await this.authService.verifyToken(token)) {
      next();
    } else {
      throw new ForbiddenException();
    }
  }
}
