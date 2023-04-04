import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Session } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "session") {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true });
  }

  validate(@Session() session: Record<string, any>): boolean {
    return this.authService.checkSession(session);
  }
}
