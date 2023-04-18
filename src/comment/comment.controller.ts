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
import { CommentService } from "./comment.service";
import { SessionGuard } from "src/auth/session.guard";
import { AdminGuard } from "src/auth/admin.guard";
import { CommentEntity } from "./comment.entity";
import { RequestWithUser, ValidateResponse } from "src/types";
import { SuccessResponse } from "src/types";
import {
  CommentPassword,
  CreateComment,
  UpdateComment,
  ValidateCommentPassword,
} from "./comment.dto";

@Controller({
  path: "comments",
  version: "1",
})
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Get(":board_id")
  @UseGuards(SessionGuard)
  async getCommentList(
    @Param("board_id") board_id: number,
  ): Promise<CommentEntity[]> {
    return await this.CommentService.getCommentList(board_id);
  }

  @Get("user")
  @UseGuards(SessionGuard)
  async getCommentListByUser(
    @Req() { user: { user_uuid } }: RequestWithUser,
  ): Promise<CommentEntity[]> {
    return await this.CommentService.getCommentListByUser(user_uuid);
  }

  @Get(":comment_id")
  async getCommentByID(
    @Param("comment_id") comment_id: number,
  ): Promise<CommentEntity> {
    return await this.CommentService.getCommentByID(comment_id);
  }

  @Post(":board_id")
  @UseGuards(SessionGuard)
  async createComment(
    @Param("board_id") board_id: number,
    @Body() comment: CreateComment,
    @Req() { user: { user_uuid } }: RequestWithUser,
  ): Promise<CommentEntity> {
    return await this.CommentService.createComment({
      ...comment,
      comment_writer: { user_uuid },
      comment_board: { board_id },
    });
  }

  @Post(":board_id/:comment_id")
  @UseGuards(SessionGuard)
  async createReply(
    @Param("board_id") board_id: number,
    @Param("comment_id") comment_id: number,
    @Body() comment: CreateComment,
    @Req() { user: { user_uuid } }: RequestWithUser,
  ): Promise<CommentEntity> {
    return await this.CommentService.createComment({
      ...comment,
      comment_writer: { user_uuid },
      comment_board: { board_id },
      comment_parent: { comment_id },
    });
  }

  @Patch(":comment_id")
  @UseGuards(SessionGuard)
  async updateComment(
    @Param("comment_id") comment_id: number,
    @Body() comment: UpdateComment,
  ): Promise<SuccessResponse> {
    return await this.CommentService.updateComment(comment_id, comment);
  }

  @Delete(":comment_id")
  @UseGuards(SessionGuard)
  async deleteComment(
    @Param("comment_id") comment_id: number,
    @Body() { comment_password }: CommentPassword,
  ): Promise<SuccessResponse> {
    return await this.CommentService.deleteComment(
      comment_id,
      comment_password,
    );
  }

  @Post("validate")
  @UseGuards(SessionGuard)
  async validateCommentPassword(
    @Body() { comment_id, comment_password }: ValidateCommentPassword,
  ): Promise<ValidateResponse> {
    return await this.CommentService.validateCommentPassword(
      comment_id,
      comment_password,
    );
  }
}
