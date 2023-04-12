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
  HttpCode,
  Session,
  UnauthorizedException,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { SessionGuard } from "src/auth/session.guard";
import { AdminGuard } from "src/auth/admin.guard";
import { BoardEntity } from "./board.entity";
import {
  BoardPassword,
  CreateBoard,
  UpdateBoard,
  ValidatePassword,
} from "./board.dto";
import { RequestWithUser, ValidateResponse } from "src/types";
import { UserEntity } from "src/user/user.entity";
import { SuccessResponse } from "src/types";

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

  @Get("test")
  @UseGuards(SessionGuard)
  async test(@Session() session) {
    return session;
  }

  @Get(":board_id")
  async getBoardByID(
    @Param("board_id") board_id: number,
  ): Promise<BoardEntity> {
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
    @Param("board_id") board_id: number,
    @Body() board: UpdateBoard,
  ): Promise<SuccessResponse> {
    if (board.board_password)
      return await this.boardService.updateBoard(board_id, board);
    throw new UnauthorizedException();
  }

  @Delete(":board_id")
  @UseGuards(SessionGuard)
  async deleteBoard(
    @Param("board_id") board_id: number,
    @Body("board_password") { board_password }: BoardPassword,
  ): Promise<SuccessResponse> {
    if (board_password)
      return await this.boardService.deleteBoard(board_id, board_password);
    throw new UnauthorizedException();
  }

  @Post("validate")
  @UseGuards(SessionGuard)
  async validatePassword(
    @Body() { board_id, board_password }: ValidatePassword,
  ): Promise<ValidateResponse> {
    return await this.boardService.validatePassword(board_id, board_password);
  }
}
