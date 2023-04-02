import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { EmailModule } from "./email/email.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
