import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendValidationEmail(email: string, code: string): boolean {
    this.mailerService
      .sendMail({
        to: email,
        subject: "선린숲 인증코드",
        html: `<h1>인증코드: ${code}</h1>`,
      })
      .catch(() => {
        return false;
      });
    return true;
  }
}
