import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator((_: undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<any>();

  const user = request.user;

  if (!user) {
    throw new UnauthorizedException('User is unauthorized');
  }

  return user;
});
