import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalUserJwtGuard extends AuthGuard('user-jwt') {
  // Don't throw when no / invalid token — just set req.user to null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest(_err: any, user: any): any {
    return user ?? null;
  }
}
