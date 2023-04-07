import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  Req,
  Res,
  HttpStatus,
  Session,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 } from "uuid";
import { AuthService } from "./auth.service";
import { EmailService } from "src/email/email.service";
import { UserEmail } from "src/user/user.dto";
import { SuccessResponse, ValidateResponse } from "./auth.interface";
import { LocalGuard } from "./local.guard";
import { UserEntity } from "src/user/user.entity";

@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post("request")
  @HttpCode(200)
  async request(@Body() { user_email }: UserEmail): Promise<SuccessResponse> {
    let user = await this.authService.getUserByEmail(user_email);
    if (user) {
      user.user_code = v4();
      await this.authService.setUserCode(user.user_uuid, user.user_code);
    } else {
      user = new UserEntity();
      user.user_email = user_email;
      user.user_code = v4();
      await this.authService.registerUser(user);
    }
    this.emailService.sendValidationEmail(user.user_email, user.user_code);
    return { success: true };
  }

  @Get("validate")
  @HttpCode(200)
  @UseGuards(LocalGuard)
  async validate(
    @Req() req,
    @Session() session: Record<string, any>,
  ): Promise<ValidateResponse> {
    const { user } = req;
    //await this.authService.setUserCode(user.user_uuid, null);
    return { validate: session !== undefined };
  }
}
