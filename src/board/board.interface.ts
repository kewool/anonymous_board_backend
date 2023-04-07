import { UserEntity } from "src/user/user.entity";

export interface CreateBoard {
  board_title: string;
  board_content: string;
  board_writer_name: string;
  board_password: string;
  board_writer: Partial<UserEntity>;
}

export interface UpdateBoard {
  board_title: string;
  board_content: string;
  board_password: string;
}
