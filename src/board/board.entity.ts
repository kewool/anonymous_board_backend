import {
  CREATE_DATE_COLUMN_OPTIONS,
  UPDATE_DATE_COLUMN_OPTIONS,
  DELETE_DATE_COLUMN_OPTIONS,
} from "../constants/column_options";
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity("boards")
export class BoardEntity {
  @PrimaryGeneratedColumn("increment")
  board_id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  board_title: string;

  @Column({ type: "text", nullable: false })
  board_content: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  board_writer_name: string;

  @Column({ type: "varchar", length: 255, nullable: false, select: false })
  board_password: string;

  @CreateDateColumn(CREATE_DATE_COLUMN_OPTIONS)
  board_created_date: Date;

  @UpdateDateColumn(UPDATE_DATE_COLUMN_OPTIONS)
  board_updated_date: Date;

  @DeleteDateColumn(DELETE_DATE_COLUMN_OPTIONS)
  board_deleted_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.user_boards)
  @JoinColumn({ name: "board_writer_uuid" })
  board_writer: UserEntity;
}
