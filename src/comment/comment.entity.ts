import {
  CREATE_DATE_COLUMN_OPTIONS,
  UPDATE_DATE_COLUMN_OPTIONS,
  DELETE_DATE_COLUMN_OPTIONS,
} from "src/constants/column_options";
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { BoardEntity } from "src/board/board.entity";

@Entity("comments")
export class CommentEntity {
  @PrimaryGeneratedColumn("increment")
  comment_id: number;

  @Column({ type: "text", nullable: false })
  comment_content: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  comment_writer_name: string;

  @Column({ type: "varchar", length: 255, nullable: false, select: false })
  comment_password: string;

  @CreateDateColumn(CREATE_DATE_COLUMN_OPTIONS)
  comment_created_date: Date;

  @UpdateDateColumn(UPDATE_DATE_COLUMN_OPTIONS)
  comment_updated_date: Date;

  @DeleteDateColumn(DELETE_DATE_COLUMN_OPTIONS)
  comment_deleted_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.user_comments)
  @JoinColumn({ name: "comment_writer_uuid" })
  comment_writer: UserEntity;

  @ManyToOne(() => BoardEntity, (board) => board.board_comments)
  @JoinColumn({ name: "comment_board_id" })
  comment_board: BoardEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.comment_parent)
  comment_children: CommentEntity[];

  @ManyToOne(() => CommentEntity, (comment) => comment.comment_children)
  @JoinColumn({ name: "comment_parent_id" })
  comment_parent: CommentEntity;
}
