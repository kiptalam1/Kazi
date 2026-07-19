import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { CurrentUserInterface } from '../interface/current-user.interface.js';

export type RequestWithUser = Request & { user: CurrentUserInterface };
export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserInterface | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return data ? request.user[data] : request.user;
  },
);
