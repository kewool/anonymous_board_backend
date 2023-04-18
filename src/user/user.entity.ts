import { IsEmail } from "class-validator";
import {
  CREATE_DATE_COLUMN_OPTIONS,
  UPDATE_DATE_COLUMN_OPTIONS,
  DELETE_DATE_COLUMN_OPTIONS,
} from "src/constants/column_options";
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { BoardEntity } from "src/board/board.entity";
import { CommentEntity } from "src/comment/comment.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  user_uuid: string;

  @Column({ length: 254, nullable: false, unique: true })
  @IsEmail()
  user_email: string;

  @Column({ length: 36, nullable: true, select: false })
  user_code: string;

  @Column({ default: 0, nullable: false, insert: false, update: false })
  user_role: number;

  @CreateDateColumn(CREATE_DATE_COLUMN_OPTIONS)
  user_created_date: Date;

  @UpdateDateColumn(UPDATE_DATE_COLUMN_OPTIONS)
  user_updated_date: Date;

  @DeleteDateColumn(DELETE_DATE_COLUMN_OPTIONS)
  user_deleted_at: Date;

  @OneToMany(() => BoardEntity, (board) => board.board_writer_uuid)
  user_boards: BoardEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.comment_writer)
  user_comments: CommentEntity[];
}
