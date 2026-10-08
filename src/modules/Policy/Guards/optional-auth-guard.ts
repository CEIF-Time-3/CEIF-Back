// auth/guards/optional-auth.guard.ts
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload,AuthenticatedRequest } from "../../Auth/types/auth.types.js";
import { CanActivate } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(req);

    if (!token) return true;                  // sem credencial: guest, segue sem req.user

    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(token);
      req.user = { id: payload.sub };
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
    return true;
  }

  private extractToken(req: AuthenticatedRequest): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}