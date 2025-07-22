import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    console.log('Request object:', request);
    return request.user;
  },
);

// export const GetUser = createParamDecorator(
//   (data, ctx: ExecutionContext): User => {
//     const request = ctx.switchToHttp().getRequest<Request>();
//     return request.user;
//   },
// );
