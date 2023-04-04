import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: "mysql",
        host: config.get<string>("DB_HOST"),
        port: parseInt(config.get("DB_PORT")),
        database: config.get<string>("DB_NAME"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        logging: config.get("NODE_ENV") === "development" ? true : false,
        entities: ["dist/**/*.entity{.ts,.js}"],
        migrations: [],
        subscribers: [],
        synchronize: config.get("NODE_ENV") === "development" ? true : false,
        charset: "utf8_general_ci",
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
