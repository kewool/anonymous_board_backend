import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  Query,
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
  ValidateBoardPassword,
} from "./board.dto";
import { RequestWithUser, ValidateResponse } from "src/types";
import { SuccessResponse } from "src/types";

@Controller({
  path: "boards",
  version: "1",
})
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @UseGuards(SessionGuard)
  async getBoardList(
    @Query("page") page: number,
    @Query("count") count: number,
  ): Promise<BoardEntity[]> {
    return await this.boardService.getBoardList(page, count);
  }

  @Get("user")
  @UseGuards(SessionGuard)
  async getBoardListByUser(
    @Req() { user: { user_uuid } }: RequestWithUser,
  ): Promise<BoardEntity[]> {
    return await this.boardService.getBoardListByUser(user_uuid);
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
    @Body() { board_password }: BoardPassword,
  ): Promise<SuccessResponse> {
    if (board_password)
      return await this.boardService.deleteBoard(board_id, board_password);
    throw new UnauthorizedException();
  }

  @Post("validate")
  @UseGuards(SessionGuard)
  async validateBoardPassword(
    @Body() { board_id, board_password }: ValidateBoardPassword,
  ): Promise<ValidateResponse> {
    return await this.boardService.validateBoardPassword(
      board_id,
      board_password,
    );
  }
}
