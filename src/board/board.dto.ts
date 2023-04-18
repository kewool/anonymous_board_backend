import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateBoard {
  @IsEmpty()
  board_id: number;

  @IsString()
  @IsNotEmpty()
  board_title: string;

  @IsString()
  @IsNotEmpty()
  board_content: string;

  @IsString()
  @IsNotEmpty()
  board_writer_name: string;

  @IsString()
  @IsNotEmpty()
  board_password: string;
}

export class UpdateBoard {
  @IsString()
  @IsNotEmpty()
  board_title: string;

  @IsString()
  @IsNotEmpty()
  board_content: string;

  @IsString()
  @IsOptional()
  board_password: string;
}

export class BoardPassword {
  @IsString()
  @IsNotEmpty()
  board_password: string;
}

export class ValidateBoardPassword extends BoardPassword {
  @IsNumber()
  @IsNotEmpty()
  board_id: number;
}
