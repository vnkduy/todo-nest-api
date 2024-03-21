import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    console.log(
      '🚀 ~ JwtAuthGuard ~ canActivate ~ context:',
      context.getHandler(),
    );
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    try {
      await this.verifyJwt(context);
    } catch (e) {
      throw new UnauthorizedException();
    }
    const token: string = (
      context.switchToHttp().getRequest().headers.authorization || ''
    ).replace('Bearer ', '');

    await this.jwtService.verify(token, {
      secret: process.env.SECRET_JWT_TOKEN,
    });

    return true;
  }

  verifyJwt(context: ExecutionContext) {
    console.log('🚀 ~ JwtAuthGuard ~ verifyJwt ~ context:', context);
    return super.canActivate(context);
  }
}
