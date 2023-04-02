import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  async getMyData(user_uuid: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { user_uuid } });
  }

  getUUIDFromReq(req: any): string {
    return this.jwtService.verify(req.headers.authorization.split(" ")[1], {
      secret: this.config.get("ACCESS_TOKEN_SECRET"),
    }).user_uuid;
  }

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
