import { BoardEntity } from "src/board/board.entity";
import { UserEntity } from "src/user/user.entity";
import { CommentEntity } from "./comment.entity";

export interface CreateComment {
  comment_content: string;
  comment_writer_name: string;
  comment_password: string;
  comment_writer: Partial<UserEntity>;
  comment_board: Partial<BoardEntity>;
}

export interface CreateReply {
  comment_content: string;
  comment_writer_name: string;
  comment_password: string;
  comment_writer: Partial<UserEntity>;
  comment_board: Partial<BoardEntity>;
  comment_parent: Partial<CommentEntity>;
}

export interface UpdateComment {
  comment_content: string;
  comment_password: string;
}
