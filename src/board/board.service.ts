import { ConflictException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class BoardService {
  constructor(private readonly mailerService: MailerService) {}

  
}
