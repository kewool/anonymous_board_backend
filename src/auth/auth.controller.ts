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
import { AuthGuard } from "@nestjs/passport";
import { Repository } from "typeorm";
import { v4 } from "uuid";
import { AuthService } from "./auth.service";
import { UserEntity } from "src/user/user.entity";
import { RequestCode } from "./auth.interface";
import { EmailService } from "src/email/email.service";
import { InjectRepository } from "@nestjs/typeorm";

@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post("request")
  @HttpCode(200)
  async request(@Body() body: RequestCode, @Res() res) {
    const user = await this.authService.getUserByEmail(body.user_email);
    if (user) {
      user.user_code = v4();
      await this.userRepository.update(
        { user_uuid: user.user_uuid },
        { user_code: user.user_code },
      );
    } else {
      user.user_email = body.user_email;
      user.user_code = v4();
      await this.userRepository.save(user);
    }
    this.emailService.sendValidationEmail(user.user_email, user.user_code);
    res.status(HttpStatus.OK).json({ success: true });
  }

  @Get("validate")
  @HttpCode(200)
  @UseGuards(AuthGuard("local"))
  async login(@Req() req, @Res() res, @Session() session: Record<string, any>) {
    const { user } = req;
    session.uuid = user.user_uuid;
    this.userRepository.update(
      { user_uuid: user.user_uuid },
      { user_code: null },
    );
    res.status(HttpStatus.OK).json({ validate: session !== undefined });
  }
}
