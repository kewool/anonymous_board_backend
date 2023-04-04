import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserEntity } from "src/user/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private authService: AuthService) {
    super({
      usernameField: "user_email",
      passwordField: "user_code",
    });
  }

  async validate(email: string, code: string): Promise<UserEntity> {
    return this.authService.validateUser(email, code);
  }
}
