import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { CreateUser } from "src/user/user.interface";
import { UserEntity } from "src/user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  async createUser(userData: CreateUser): Promise<UserEntity> {
    if (await this.getUserByEmail(userData.user_email)) {
      throw new HttpException("User or Email already exists", 400);
    }
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return this.getUserByEmail(userData.user_email);
  }

  async validateUser(email: string, code: string): Promise<UserEntity> {
    const uuid = await this.getUUIDByEmail(email);
    const user = await this.getUserPwByUUID(uuid);
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

  async getUserPwByUUID(user_uuid: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { user_uuid },
      select: ["user_email", "user_code"],
    });
  }

  async getUserByEmail(user_email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { user_email } });
  }

  async getUserRefreshTokenByUUID(user_uuid: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { user_uuid },
      select: ["user_refresh_token"],
    });
  }

  async getRefreshToken(email: string): Promise<string> {
    const user_uuid = await this.getUUIDByEmail(email);
    const user_refresh_token = this.getToken(user_uuid, "REFRESH");
    await this.userRepository.update({ user_uuid }, { user_refresh_token });
    return user_refresh_token;
  }

  getAccessToken(refreshToken: string): object {
    const uuid = this.getUUIDFromToken(refreshToken, "REFRESH");
    const accessToken = this.getToken(uuid, "ACCESS");
    return { accessToken: accessToken };
  }

  async refreshTokenMatch(
    uuid: string,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.getUserRefreshTokenByUUID(uuid);
    if (user?.user_refresh_token === refreshToken) {
      return true;
    }
    return false;
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    const user_uuid = this.getUUIDFromToken(refreshToken, "REFRESH");
    await this.userRepository.update(
      { user_uuid },
      { user_refresh_token: null },
    );
    return;
  }

  getToken(user_uuid: string, kind: string): string {
    return this.jwtService.sign(
      { user_uuid },
      {
        secret: this.config.get(`${kind}_TOKEN_SECRET`),
        expiresIn: this.config.get(`${kind}_TOKEN_EXPIRES_IN`),
      },
    );
  }

  getUUIDFromToken(token: string, kind: string): string {
    return this.jwtService.verify(token, {
      secret: this.config.get(`${kind}_TOKEN_SECRET`),
    }).user_uuid;
  }

  async checkAdmin(accessToken: string): Promise<boolean> {
    const uuid = this.getUUIDFromToken(accessToken, "ACCESS");
    const user = await this.getUserByUUID(uuid);
    if (user && user.user_role === 1) {
      return true;
    }
    return false;
  }
}
