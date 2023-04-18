import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { CommentEntity } from "./comment.entity";
import { UserEntity } from "src/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
