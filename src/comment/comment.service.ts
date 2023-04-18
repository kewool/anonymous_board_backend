import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommentEntity } from "./comment.entity";
import { UserEntity } from "src/user/user.entity";
import { SuccessResponse, ValidateResponse } from "src/types";
import { CreateComment, CreateReply, UpdateComment } from "./comment.interface";
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getCommentList(board_id: number): Promise<CommentEntity[]> {
    return await this.commentRepository.find({
      where: { comment_board: { board_id } },
    });
  }

  async getCommentByID(comment_id: number): Promise<CommentEntity> {
    return await this.commentRepository.findOne({ where: { comment_id } });
  }

  async getCommentListByUser(user_uuid: string): Promise<CommentEntity[]> {
    const comment = await this.commentRepository.find({
      where: { comment_writer: { user_uuid } },
    });
    return comment;
  }

  async createComment(
    comment: CreateComment | CreateReply,
  ): Promise<CommentEntity> {
    return await this.commentRepository.save(comment);
  }

  async updateComment(
    comment_id: number,
    comment: UpdateComment,
  ): Promise<SuccessResponse> {
    const { validate } = await this.validateCommentPassword(
      comment_id,
      comment.comment_password,
    );
    if (validate) {
      await this.commentRepository.update(comment_id, comment);
      return { success: true };
    }
    throw new UnauthorizedException();
  }

  async deleteComment(
    comment_id: number,
    comment_password: string,
  ): Promise<SuccessResponse> {
    const { validate } = await this.validateCommentPassword(
      comment_id,
      comment_password,
    );
    if (validate) {
      await this.commentRepository.softDelete(comment_id);
      return { success: true };
    }
    throw new UnauthorizedException();
  }

  async validateCommentPassword(
    comment_id: number,
    comment_password: string,
  ): Promise<ValidateResponse> {
    const comment = await this.commentRepository.findOne({
      where: { comment_id },
    });
    if (comment.comment_password === comment_password)
      return { validate: true };
    return { validate: false };
  }
}
