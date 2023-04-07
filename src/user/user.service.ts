import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async fetchUser(user_email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { user_email } });
  }

  async getUserByUUID(user_uuid: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { user_uuid } });
  }
}
