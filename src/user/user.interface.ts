export class UpdateUser {
  user_email: string;
  user_code: string;
}

export interface User {
  user_uuid: string;
  user_email: string;
  user_role: number;
  user_created_date: Date;
}

export interface CreateUser {
  user_email: string;
  user_code: string;
}
