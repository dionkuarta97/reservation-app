
import { ApiProperty } from "@nestjs/swagger";

export class CreateTableDto {

  @ApiProperty({ description: "table number is required and unique", example: 1 })
  table_number: number;

}