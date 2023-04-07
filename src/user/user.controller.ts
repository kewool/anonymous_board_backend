import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
} from "@nestjs/common";
import { Request } from "express";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { AdminGuard } from "src/auth/admin.guard";
import { UserEmail } from "./user.dto";

@Controller({
  path: "user",
  version: "1",
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("findall")
  @UseGuards(AdminGuard)
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post("fetch")
  @HttpCode(200)
  @UseGuards(AdminGuard)
  async fetchUser(@Body() { user_email }: UserEmail): Promise<UserEntity> {
    return this.userService.fetchUser(user_email);
  }
}
