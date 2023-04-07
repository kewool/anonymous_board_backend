import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserEntity } from "src/user/user.entity";
import { LocalStrategy } from "./local.strategy";
import { AdminStrategy } from "./admin.strategy";
import { EmailService } from "src/email/email.service";
import { SessionSerializer } from "./session.serializer";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailService,
    LocalStrategy,
    ConfigService,
    AdminStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
