import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { SessionGuard } from "src/auth/session.guard";
import { AdminGuard } from "src/auth/admin.guard";

@Controller({
  path: "email",
  version: "1",
})
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  sendEmail(): string {
    return;
  }
}
