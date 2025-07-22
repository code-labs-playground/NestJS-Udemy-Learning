import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  // console.log('Request object:', request);
  return request.user;
});

// export const GetUser = createParamDecorator(
//   (data, ctx: ExecutionContext): User => {
//     const request = ctx.switchToHttp().getRequest<Request>();
//     return request.user;
//   },
// );
