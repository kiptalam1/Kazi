import { Injectable, UnauthorizedException, type CanActivate, type ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator.js";
import type { Role } from "../../generated/prisma/enums.js";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../../users/users.service.js";
import type { RequestWithUser } from "../decorators/current-user.decorator.js";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ])
    if (isPublic) {
      return true;
    }
    // get tokens from cookies;
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const accessToken = request.cookies?.access_token;
    if (!accessToken) {
      throw new UnauthorizedException('No token provided');
    }

    let payload: {
      sub: string;
      email: string;
      roles: Role[];
    };
    try {
      payload = await this.jwtService.verifyAsync(accessToken, { secret: this.configService.get('JWT_ACCESS_SECRET') })
    } catch {
      throw new UnauthorizedException('Invalid or expired access token')
    }

    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    request.user = {
      id: user.id,
      email: user.email,
      roles: user.roles.map(r => r.role)

    };
    return true;
  }
}
