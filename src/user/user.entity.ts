import { IsEmail } from "class-validator";
import {
  CREATE_DATE_COLUMN_OPTIONS,
  UPDATE_DATE_COLUMN_OPTIONS,
  DELETE_DATE_COLUMN_OPTIONS,
} from "../constants/column_options";
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  DeleteDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  user_uuid: string;

  @Column({ length: 254, nullable: false, unique: true })
  @IsEmail()
  user_email: string;

  @Column({ length: 200, nullable: false, select: false })
  user_code: string;

  @Column({ default: 0, nullable: false, insert: false, update: false })
  user_role: number;

  @Column({ length: 200, nullable: true, select: false })
  user_refresh_token: string;

  @CreateDateColumn(CREATE_DATE_COLUMN_OPTIONS)
  user_created_date: Date;

  @UpdateDateColumn(UPDATE_DATE_COLUMN_OPTIONS)
  user_updated_date: Date;

  @DeleteDateColumn(DELETE_DATE_COLUMN_OPTIONS)
  user_deleted_at: Date;

  @BeforeInsert()
  nullUUID(): void {
    if (this.user_uuid) {
      delete this.user_uuid;
    }
  }
}
