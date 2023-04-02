export class UpdateUser {
  user_email: string;
  user_code: string;
}

export interface User {
  user_uuid: string;
  user_email: string;
  user_code: string;
  user_role: number;
}

export interface CreateUser {
  user_email: string;
  user_code: string;
}
