import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  async validateUser(email: string, code: string): Promise<UserEntity> {
    const user = await this.getUserByEmail(email);
    if (user && code == user.user_code) {
      delete user.user_code;
      return user;
    }
    return null;
  }

  async getUUIDByEmail(user_email: string): Promise<string> {
    const { user_uuid } = await this.userRepository.findOne({
      where: { user_email },
      select: ["user_uuid"],
    });
    return user_uuid;
  }

  async getUserByUUID(user_uuid: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { user_uuid } });
  }

  async getUserCodeByUUID(user_uuid: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { user_uuid },
      select: ["user_email", "user_code"],
    });
  }

  async getUserByEmail(user_email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { user_email },
      select: ["user_uuid", "user_email", "user_code"],
    });
  }

  async setUserCode(user_uuid: string, user_code: string): Promise<void> {
    await this.userRepository.update({ user_uuid }, { user_code });
  }

  async registerUser(user: UserEntity): Promise<void> {
    await this.userRepository.save(user);
  }
}
