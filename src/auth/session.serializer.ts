import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserUUID } from "./auth.interface";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: UserUUID,
    done: (err: Error | null, id?: UserUUID) => void,
  ): void {
    done(null, user);
  }

  deserializeUser(
    payload: unknown,
    done: (err: Error | null, payload?: unknown) => void,
  ): void {
    done(null, payload);
  }
}
