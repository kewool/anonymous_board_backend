import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("boards")
export class BoardEntity {
  @PrimaryGeneratedColumn("increment")
  board_id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  board_title: string;

  @Column({ type: "text", nullable: false })
  board_content: string;
}
