import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
} from "@nestjs/common";
import { EmailService } from "./email.service";
import { AccessGuard } from "src/auth/access.guard";
import { AdminGuard } from "src/auth/admin.guard";

@Controller({
  path: "email",
  version: "1",
})
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  sendEmail(): string {
    return this.emailService.sendHello();
  }
}
