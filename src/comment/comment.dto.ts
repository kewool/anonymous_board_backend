import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateComment {
  @IsString()
  @IsNotEmpty()
  comment_content: string;

  @IsString()
  @IsNotEmpty()
  comment_writer_name: string;

  @IsString()
  @IsNotEmpty()
  comment_password: string;
}

export class UpdateComment {
  @IsString()
  @IsNotEmpty()
  comment_content: string;

  @IsString()
  @IsNotEmpty()
  comment_password: string;
}

export class CommentPassword {
  @IsString()
  @IsNotEmpty()
  comment_password: string;
}

export class ValidateCommentPassword extends CommentPassword {
  @IsNumber()
  @IsNotEmpty()
  comment_id: number;
}
