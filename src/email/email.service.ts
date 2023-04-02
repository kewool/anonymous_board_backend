import { ConflictException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendHello(): string {
    this.mailerService
      .sendMail({
        to: "kkttyy324@gmail.com",
        subject: "Testing Nest MailerModule ✔",
        text: "welcome",
        html: "<b>welcome</b>",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    return process.env.MAIL_PW;
  }

  sendValidationEmail(email: string, code: string): boolean {
    return true;
  }
}
