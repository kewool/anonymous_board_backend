import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  Session,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { SessionGuard } from "src/auth/session.guard";
import { AdminGuard } from "src/auth/admin.guard";
import { BoardEntity } from "./board.entity";
import { CreateBoard, UpdateBoard, ValidatePassword } from "./board.dto";
import { RequestWithUser } from "src/types";
import { UserEntity } from "src/user/user.entity";

@Controller({
  path: "board",
  version: "1",
})
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @UseGuards(SessionGuard)
  async getBoardList(): Promise<BoardEntity[]> {
    return await this.boardService.getBoardList();
  }

  @Get("user")
  @UseGuards(SessionGuard)
  async getBoardListByUser(
    @Req() { user: { user_uuid } }: RequestWithUser,
  ): Promise<BoardEntity[]> {
    return await this.boardService.getBoardListByUser(user_uuid);
  }

  @Get(":board_id")
  async getBoardByID(@Body("board_id") board_id: number): Promise<BoardEntity> {
    return await this.boardService.getBoardByID(board_id);
  }

  @Post()
  @UseGuards(SessionGuard)
  async createBoard(
    @Body() board: CreateBoard,
    @Req() { user: { user_uuid } }: RequestWithUser,
  ): Promise<BoardEntity> {
    return await this.boardService.createBoard({
      ...board,
      board_writer: { user_uuid },
    });
  }

  @Patch(":board_id")
  @UseGuards(SessionGuard)
  async updateBoard(
    @Param("board_id", ParseIntPipe) board_id,
    @Body() board: UpdateBoard,
  ): Promise<boolean> {
    return await this.boardService.updateBoard(board_id, board);
  }

  @Delete(":board_id")
  @UseGuards(SessionGuard)
  async deleteBoard(
    @Param("board_id", ParseIntPipe) board_id,
    @Body("board_password") board_password: string,
  ): Promise<boolean> {
    return await this.boardService.deleteBoard(board_id, board_password);
  }

  @Post("validate")
  @HttpCode(200)
  async validatePassword(
    @Body() { board_id, board_password }: ValidatePassword,
  ): Promise<BoardEntity> {
    return await this.boardService.validatePassword(board_id, board_password);
  }
}
