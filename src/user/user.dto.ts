import { IsEmail } from "class-validator";

export class UserEmail {
  @IsEmail()
  user_email: string;
}
