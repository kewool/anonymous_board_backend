import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { BoardEntity } from "./board.entity";
import { UserEntity } from "src/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, UserEntity])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
