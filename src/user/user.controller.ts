import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { AdminGuard } from "src/auth/admin.guard";

@Controller({
  path: "user",
  version: "1",
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getMyData(@Req() req): Promise<UserEntity> {
    return this.userService.getMyData(this.userService.getUUIDFromReq(req));
  }

  @Get("findall")
  @UseGuards(AdminGuard)
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post("fetch")
  @HttpCode(200)
  @UseGuards(AdminGuard)
  async fetchUser(@Body() body): Promise<UserEntity> {
    return this.userService.fetchUser(body.user_id);
  }
}
