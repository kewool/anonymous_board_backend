import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Passport } from "passport";
import { AuthService } from "./auth.service";

@Injectable()
export class AdminStrategy extends PassportStrategy(Passport, "admin") {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(payload: any) {
    return false;
  }
}
