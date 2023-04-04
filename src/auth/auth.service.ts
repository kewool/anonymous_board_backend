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
      return user;
    }
    return null;
  }

  async getUUIDByEmail(user_email: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { user_email },
      select: ["user_uuid"],
    });
    return user.user_uuid;
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

  checkSession(session: Record<string, any>): boolean {
    return session.user_uuid ? true : false;
  }
}
