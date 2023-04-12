import {
  INestApplication,
  Logger,
  VersioningType,
  ValidationPipe,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import session from "express-session";
import { AppModule } from "./app.module";
import passport from "passport";

async function swagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("DAT REST API Gateway")
    .setDescription("DAT project REST API description")
    .setVersion("1.0")
    .addTag("REST")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("document/rest", app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  app.use(cookieParser());
  app.use(
    session({
      secret: config.get<string>("SESSION_SECRET"),
      resave: true,
      saveUninitialized: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: config.get<string>("FRONTEND_URL"),
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type, Authorization, Accept",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: config.get<string>("NODE_ENV") === "production",
      transform: true,
    }),
  );

  if (config.get<string>("NODE_ENV") === "development") {
    await swagger(app);
  }

  await app.listen(config.get<number>("PORT"));

  Logger.log(
    `Server running on ${config.get<string>("NODE_ENV")} mode`,
    "Bootstrap",
  );
  Logger.log(
    `Server running on http://localhost:${config.get<number>("PORT")}`,
    "Bootstrap",
  );
}
bootstrap();
