import { Request } from "express";
import { User } from "src/user/user.interface";

export interface RequestWithUser extends Request {
  user: User;
}
