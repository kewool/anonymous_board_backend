import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardEntity } from "./board.entity";
import { CreateBoard, UpdateBoard } from "./board.interface";
import { UserEntity } from "src/user/user.entity";
import { SuccessResponse, ValidateResponse } from "src/types";
@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getBoardList(): Promise<BoardEntity[]> {
    return await this.boardRepository.find();
  }

  async getBoardByID(board_id: number): Promise<BoardEntity> {
    return await this.boardRepository.findOne({ where: { board_id } });
  }

  async getBoardListByUser(user_uuid: string): Promise<BoardEntity[]> {
    const board = await this.boardRepository.find({
      where: { board_writer: { user_uuid } },
    });
    return board;
  }

  async createBoard(board: CreateBoard): Promise<BoardEntity> {
    return await this.boardRepository.save(board);
  }

  async updateBoard(board_id: number, board: UpdateBoard): Promise<any> {
    const { validate } = await this.validatePassword(
      board_id,
      board.board_password,
    );
    if (validate) {
      await this.boardRepository.update(board_id, board);
      return { success: true };
    }
    throw new UnauthorizedException();
  }

  async deleteBoard(
    board_id: number,
    board_password: string,
  ): Promise<SuccessResponse> {
    const { validate } = await this.validatePassword(board_id, board_password);
    if (validate) {
      await this.boardRepository.softDelete(board_id);
      return { success: true };
    }
    throw new UnauthorizedException();
  }

  async validatePassword(
    board_id: number,
    board_password: string,
  ): Promise<ValidateResponse> {
    const board = await this.boardRepository.findOne({
      where: { board_id, board_password },
    });
    if (board) return { validate: true };
    return { validate: false };
  }
}
